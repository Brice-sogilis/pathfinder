
import cors from 'cors';

import {GridCRUDRepository, GridDAO} from './GridDAO';
import * as grpc from "@grpc/grpc-js";
import * as messages from "./pb/grid_pb";
import * as services from "./pb/grid_grpc_pb";
import { GridStoreClient } from './pb/grid_grpc_pb';

function gridDAOasRPC(dao: GridDAO) : messages.Grid{
    var grid : messages.Grid = new messages.Grid();
    grid.setName(dao.name);
    grid.setLinesList(dao.lines);
    grid.setHeight(dao.height);
    grid.setWidth(dao.width);
    return grid;
}

function gridRPCasDAO(grpc: messages.Grid) : GridDAO {
    return new GridDAO(grpc.getName(), grpc.getLinesList());
}

class GridStoreServiceImpl {
    server: grpc.Server;
    repositoryAccess: Promise<GridCRUDRepository>;
    methodMapping = {
        getAllGrids: (c: grpc.ServerWritableStream<messages.GetAllGridsRequest, messages.Grid>) => {this.getAllGrids(c)},
        getGridByName: (c: grpc.ServerUnaryCall<messages.GetGridByNameRequest, messages.Grid>, cb : (e : grpc.ServerErrorResponse | null, r : messages.Grid | null) => void) => {this.getGridByName(c,cb)},
        deleteAllGrids: (c: grpc.ServerUnaryCall<messages.DeleteAllGridsRequest, messages.BooleanResponse>, cb : (e: grpc.ServerErrorResponse | null, r: messages.BooleanResponse) => void) => {this.deleteAllGrids(c, cb)},
        deleteGridByName : (c : grpc.ServerUnaryCall<messages.DeleteGridByNameRequest, messages.BooleanResponse>, cb : (e: grpc.ServerErrorResponse | null, r : messages.BooleanResponse) => void) => {this.deleteGridByName(c, cb)},
        createGrid: (c: grpc.ServerUnaryCall<messages.CreateGridRequest, messages.BooleanResponse>, cb: (e : grpc.ServerErrorResponse | null, r: messages.BooleanResponse) => void) => {this.createGrid(c, cb)},
    }
    constructor(repositoryAccess: Promise<GridCRUDRepository>) {
        this.repositoryAccess = repositoryAccess;
        this.server = new grpc.Server();
        this.serverMapping();
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
        call : grpc.ServerWritableStream<messages.GetAllGridsRequest, messages.Grid>) {
            this.repositoryAccess.then(repo => {
                repo.listGrids().then(gridArray => {
                    gridArray.forEach(g => {
                        call.write(gridDAOasRPC(g));
                    });
                    call.end();
                });
            });
    }
    
    getGridByName(
        call : grpc.ServerUnaryCall<messages.GetGridByNameRequest, messages.Grid>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.Grid | null) => void) {
            this.repositoryAccess.then(repo => {
                repo.getGridByName(call.request.getName()).then(dao => {
                    if(dao !== null){
                        var grid = gridDAOasRPC(dao!);
                        callback(null, grid);
                    }
                    else{
                        callback(new Error("Not Found"), null);
                    }

                });
            });
    }
    
    deleteAllGrids(
        call : grpc.ServerUnaryCall<messages.DeleteAllGridsRequest, messages.BooleanResponse>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.BooleanResponse) => void) {
            this.repositoryAccess.then(repo => {
                repo.deleteAll().then(b => {
                    var res = new messages.BooleanResponse();
                    res.setOk(b);
                    callback(null, res);
                });
            });
    }

    deleteGridByName(        
        call : grpc.ServerUnaryCall<messages.DeleteGridByNameRequest, messages.BooleanResponse>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.BooleanResponse) => void){
            this.repositoryAccess.then(repo => {
                repo.deleteGridByName(call.request.getName()).then(bool => {
                    var res = new messages.BooleanResponse();
                    res.setOk(bool);
                    callback(null, res);
                });
            });
        }
    
    createGrid(
        call : grpc.ServerUnaryCall<messages.CreateGridRequest, messages.BooleanResponse>,
        callback : (err : grpc.ServerErrorResponse | null, res : messages.BooleanResponse) => void) {
            const dao : GridDAO = new GridDAO(call.request.getGrid()!.getName(), call.request.getGrid()!.getLinesList());
            this.repositoryAccess.then(repo => {
                repo.createGrid(dao).then(b => {
                    var res = new messages.BooleanResponse();
                    res.setOk(b);
                    callback(null, res);
                });
            });
    }
}

class GridRepositoryRPCWrapper implements GridCRUDRepository {
    client : GridStoreClient;
    constructor(client : GridStoreClient) {
        this.client = client;
    }
    getGridByName(name: string): Promise<GridDAO | null> {
        return new Promise((resolve, reject) => {
            var req = new messages.GetGridByNameRequest();
            req.setName(name);
            this.client.getGridByName(req, (error, grid) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(gridRPCasDAO(grid!));
                }
            });
        });
    }
    
    listGrids(): Promise<GridDAO[]> {
        throw new Error('Method not implemented.');
    }
    createGrid(grid: GridDAO): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteGridByName(name: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteAll(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export {GridStoreServiceImpl, gridRPCasDAO, gridDAOasRPC}