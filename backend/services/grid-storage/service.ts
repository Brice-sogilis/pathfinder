
import cors from 'cors';

import {GridCRUDRepository, GridDAO} from './GridDAO';
import * as grpc from "@grpc/grpc-js";
import * as messages from "./pb/grid_pb";
import * as services from "./pb/grid_grpc_pb";

class GridStoreServiceImpl {
    server: grpc.Server;
    repositoryAccess: Promise<GridCRUDRepository>;
    methodMapping = {
        getAllGrids: (c: grpc.ServerWritableStream<messages.getAllGridsRequest, messages.Grid>) => {this.getAllGrids(c)},
        getGridByName: (c: grpc.ServerUnaryCall<messages.getGridByNameRequest, messages.Grid>, cb : (e : grpc.ServerErrorResponse | null, r : messages.Grid | null) => void) => {this.getGridByName(c,cb)},
        deleteAllGrids: (c: grpc.ServerUnaryCall<messages.deleteAllGridsRequest, messages.BooleanResponse>, cb : (e: grpc.ServerErrorResponse | null, r: messages.BooleanResponse) => void) => {this.deleteAllGrids(c, cb)},
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
        callback : (err : grpc.ServerErrorResponse | null, res : messages.BooleanResponse) => void) {
            this.repositoryAccess.then(repo => {
                repo.deleteAll().then(b => {
                    var res = new messages.BooleanResponse();
                    res.setOk(b);
                    callback(null, res);
                });
            });
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