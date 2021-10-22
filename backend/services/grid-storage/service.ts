import express, { Application } from 'express';
import cors from 'cors';
import {connectGridDatabase} from './mongo-utils';
import {GridCRUDRepository, GridDAO, MongoGridCRUDRepository} from './GridDAO';
import * as grpc from "@grpc/grpc-js";
import * as messages from "./pb/grid_pb";
import * as services from "./pb/grid_grpc_pb";

let DB_HOSTNAME = process.env.DB_HOSTNAME
let DB_PORT = (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 27017
let mongoClient = connectGridDatabase(DB_HOSTNAME, DB_PORT);
let repository : MongoGridCRUDRepository | null = null;

/* vvvvvv TO MIGRATE TO GATEWAY vvvvvv*/
class Gateway {
    app: Application
    repositoryAccess: Promise<GridCRUDRepository>
    constructor(repositoryAccess : Promise<GridCRUDRepository>) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.repositoryAccess = repositoryAccess;
        this.configRoutes();
    }

    configRoutes(){
        this.app.get("/health", function(req, res) {
            res.sendStatus(200);
        });
        
        this.app.get("/grid", async (req, res) => {
            res.status(200).send(await (await this.repositoryAccess).listGrids());
        });
        
        this.app.get("/grid/:name", async (req, res) => {
            res.status(200).send(await(await this.repositoryAccess).getGridByName(req.params.name));
        });
        
        this.app.delete("/grid/:name", async (req, res) => {
            const present = await (await this.repositoryAccess).deleteGridByName(req.params.name);
            res.sendStatus((present)?200:404);
        });
        
        this.app.post("/grid", async (req, res) => {
            await (await this.repositoryAccess).createGrid(req.body);
            res.sendStatus(201);
        });
    }

    listen(port : number) {
        return this.app.listen(port);
    }
}

async function getRepository() : Promise<MongoGridCRUDRepository> {
    if(repository !== null) return repository;
    else {
        repository = new MongoGridCRUDRepository(await mongoClient);
        return repository;
    }
}

var gateway = new Gateway(getRepository());
gateway.listen(8888);
export {Gateway, getRepository, gateway};
/* ^^^^^^ TO MIGRATE TO GATEWAY ^^^^^^ */

/* vvvvvv NEW GRPC SERVER vvvvvv */
class GridStoreServiceImpl {
    server: grpc.Server;
    repositoryAccess: Promise<GridCRUDRepository>;
    methodMapping = {
        getAllGrids: (c: grpc.ServerWritableStream<messages.getAllGridsRequest, messages.Grid>) => {this.getAllGrids(c)},
        getGridByName: (c: grpc.ServerUnaryCall<messages.getGridByNameRequest, messages.Grid>, cb : (e : grpc.ServerErrorResponse | null, r : messages.Grid | null) => void) => {this.getGridByName(c,cb)},
        deleteAllGrids: (c: grpc.ServerUnaryCall<messages.deleteAllGridsRequest, messages.BooleanResponse>, cb : (e: grpc.ServerErrorResponse, r: messages.BooleanResponse) => void) => {this.deleteAllGrids(c, cb)},
        createGrid: (c: grpc.ServerUnaryCall<messages.CreateGridRequest, messages.BooleanResponse>, cb: (e : grpc.ServerErrorResponse | null, r: messages.BooleanResponse) => void) => {this.createGrid(c, cb)},
    }
    constructor(repositoryAccess: Promise<GridCRUDRepository>) {
        this.repositoryAccess = repositoryAccess;
        this.server = new grpc.Server();
        this.serverMapping();
    }

    asRPC(dao: GridDAO) : messages.Grid{
        var grid : messages.Grid = new messages.Grid();
        grid.setName(dao.name);
        grid.setLinesList(dao.lines);
        grid.setHeight(dao.height);
        grid.setWidth(dao.width);
        return grid;
    }

    asDAO(grpc: messages.Grid) : GridDAO {
        return new GridDAO(grpc.getName(), grpc.getLinesList());
    }

    serverMapping() {
        this.server.addService(services.GridStoreService, this.methodMapping);
    }

    listen(port: number, callback : () => void) {
        this.server.bindAsync("0.0.0.0:"+port, grpc.ServerCredentials.createInsecure(), () => {
            this.server.start();
            callback();
          });
    }

    forceClose() {
        this.server.forceShutdown();
    }

    close(callback: (error?: Error | undefined) => void) {
        this.server.tryShutdown(callback);
    }

    getAllGrids(
        call : grpc.ServerWritableStream<messages.getAllGridsRequest, messages.Grid>) {
            call.end();
    }
    
    getGridByName(
        call : grpc.ServerUnaryCall<messages.getGridByNameRequest, messages.Grid>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.Grid | null) => void) {
            this.repositoryAccess.then(repo => {
                repo.getGridByName(call.request.getName()).then(dao => {
                    if(dao !== null){
                        var grid = this.asRPC(dao!);
                        callback(null, grid);
                    }
                    else{
                        callback(new Error("Not Found"), null);
                    }

                });
            })
    }
    
    deleteAllGrids(
        call : grpc.ServerUnaryCall<messages.deleteAllGridsRequest, messages.BooleanResponse>,
        callback : (err : grpc.ServerErrorResponse, res : messages.BooleanResponse) => void) {
            callback(new Error("Not implemented"), new messages.BooleanResponse());
    }
    
    createGrid(
        call : grpc.ServerUnaryCall<messages.CreateGridRequest, messages.BooleanResponse>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.BooleanResponse) => void) {
            const dao : GridDAO = new GridDAO(call.request.getGrid()!.getName(), call.request.getGrid()!.getLinesList());
            console.log("Built DAO from gRPC request");
            this.repositoryAccess.then(repo => {
                repo.createGrid(dao).then(b => {
                    var res = new messages.BooleanResponse();
                    res.setOk(b);
                    callback(null, res);
                });
            });
    }
}


export {GridStoreServiceImpl}
/* ^^^^^^ NEW GRPC SERVER ^^^^^^ */