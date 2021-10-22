import chai from 'chai'
import chai_as_promised from 'chai-as-promised';
import * as messages from "../pb/grid_pb";
import * as services from "../pb/grid_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import {testGrid, MockGridCRUDRepository, getMockAsPromise} from './common';
import { GridStoreServiceImpl, gridDAOasRPC, gridRPCasDAO} from '../service';
import { describe } from 'mocha';
import { GridDAO } from '../GridDAO';
const expect = chai.expect;
chai.use(chai_as_promised);
let should = chai.should();
const server = new GridStoreServiceImpl(getMockAsPromise());

function clear(callback : () => void) {
    server.repositoryAccess.then(repo => {
        repo.deleteAll().then(b => {
            callback();
        });
    });
}

function createGridByNameRequest(name : string) {
    var res = new messages.GetGridByNameRequest();
    res.setName(name);
    return res;
}

describe('Connection to GRPC server', function() {
    
    this.beforeAll(function(done) {
        server.listen(9999, done);
    });
    this.afterAll(function(done) {
        server.close(done);
    });
    
    it('Should create a client without error', function() {
        var client: services.GridStoreClient = new services.GridStoreClient(
            "localhost:9999",
            grpc.credentials.createInsecure()
          );
    });
});

describe('GRPC GetGrid Operations', function() {
    var client: services.GridStoreClient = new services.GridStoreClient(
        "localhost:9999",
        grpc.credentials.createInsecure()
      );

    this.beforeAll(function(done) {
        server.listen(9999, () => clear(done));
    });
    
    this.afterAll(function(done) {
        client.close();
        server.forceClose();
        clear(done);
    });

    it('Should retrieve an empty list without initial data', function(done) {
        var stream = client.getAllGrids(new messages.GetAllGridsRequest());
        var arr : Array<messages.Grid> = [];
        stream.on('data', function(grid) {
            arr.push(grid);
        });
        stream.on('end', () => {
            expect(arr.length).to.be.eql(0);
            done();
        })
    });

    it('Should fail when getting a non existing name', function(done) {
        var req = new messages.GetGridByNameRequest();
        req.setName("Unknown_Test_Name");
        client.getGridByName(req, (err, data) => {
            if(err){
                expect(err.code).not.to.be.eql(12, "Service should implement this method");
                done();
            }
            else{
                done("Error");
            }
        });
    });

    it('Should return an existing grid with identical name', function(done) {
        server.repositoryAccess.then(repo => {
            repo.createGrid(testGrid).then(b => {
                client.getGridByName(createGridByNameRequest(testGrid.name), async (err, res) => {
                    if(err){
                        await (await server.repositoryAccess).deleteAll();
                        done(err);
                    }
                    else{
                        expect(res?.getName()).to.be.eql(testGrid.name);
                        await (await server.repositoryAccess).deleteAll();
                        done();
                    }
                });
            });
        });
    });

    it('Should return a list containing all the grids regitered in the repository', function(done) {
        var testGridAltered = new GridDAO(testGrid.name+"Bis", testGrid.lines);
        server.repositoryAccess.then(repo => {
            repo.createGrid(testGrid).then(b => repo.createGrid(testGridAltered).then(bool => {
                var req = new messages.GetAllGridsRequest();
                var gridStream = client.getAllGrids(req);    
                var gridArray : Array<GridDAO> = []; 
                console.log("Setting event hooks");
                gridStream.on('data', (grid: messages.Grid) => {
                    console.log("Receiving item");
                    gridArray.push(gridRPCasDAO(grid));
                });
                gridStream.on('end', () => {
                    console.log("End of call");
                    expect(gridArray.length).to.be.greaterThan(0);
                    expect(gridArray.length).to.be.eql(2);
                    console.log("Clearing");
                    repo.deleteAll().then(_ => {console.log("Cleared");done();});
                });
            }));
        });
    })
});

describe('GRPC CreateGrid operations', function() {
    var client: services.GridStoreClient = new services.GridStoreClient(
        "localhost:9999",
        grpc.credentials.createInsecure()
      );

    this.beforeAll(function(done) {
        server.listen(9999, () => clear(done));
    });

    this.afterAll(function(done) {
        client.close();
        server.forceClose();
        clear(done);
    });

    it('Setup', function(done) {
        done();
    });

    it('Should succeed to create a grid', function(done) {
        var grid = new messages.Grid();
        grid.setName(testGrid.name);
        grid.setLinesList(testGrid.lines);
        grid.setHeight(testGrid.height);
        grid.setWidth(testGrid.width);
        var req = new messages.CreateGridRequest();
        req.setGrid(grid);
        client.createGrid(req, (err, res) => {
            if(err){
                done(err);
            }
            else{
                done();
            }
        });
    });

    it('Should create an identical grid to the argument', function(done) {
        var req = new messages.CreateGridRequest();
        var grid = new messages.Grid();
        grid.setName(testGrid.name);
        grid.setLinesList(testGrid.lines);
        grid.setHeight(testGrid.height);
        grid.setWidth(testGrid.width);
        req.setGrid(grid);
        client.createGrid(req, (err, res) => {
            if(err){
                done(err);
            }
            else{
                expect(res?.getOk()).to.be.true;
                var getReq = new messages.GetGridByNameRequest();
                getReq.setName(grid.getName());
                client.getGridByName(getReq, (error, result) => {
                    if(error){
                        done(error);
                    }
                    else{
                        expect(result?.getName()).to.be.eql(grid.getName());
                        expect(result?.getHeight()).to.be.eql(testGrid.height);
                        done();
                    }
                });
            }
        });
    });
});