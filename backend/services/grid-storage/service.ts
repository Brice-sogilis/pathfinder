import express, { Application } from 'express';
import cors from 'cors';
import {connectGridDatabase} from './mongo-utils';
import {GridCRUDRepository, MongoGridCRUDRepository} from './GridDAO';
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
var exportedApp = gateway.app;
export {Gateway, getRepository};
/* ^^^^^^ TO MIGRATE TO GATEWAY ^^^^^^ */

/* vvvvvv NEW GRPC SERVER vvvvvv */
var server = new grpc.Server();
function getAllGrids(
    call : grpc.ServerWritableStream<messages.getAllGridsRequest, messages.Grid>) {
        call.end();
}
function getGridByName(
    call : grpc.ServerUnaryCall<messages.getGridByNameRequest, messages.Grid>,
    callback : (err : grpc.ServerErrorResponse, res : messages.Grid) => void) {
        callback(new Error("Not implemented"), new messages.Grid());
}
server.addService(services.GridStoreService, { getAllGrids: getAllGrids, getGridByName: getGridByName });
/* ^^^^^^ NEW GRPC SERVER ^^^^^^ */