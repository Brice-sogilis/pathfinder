import chai from 'chai'
import chai_as_promised from 'chai-as-promised';
import * as messages from "../pb/grid_pb";
import * as services from "../pb/grid_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import {testGrid, MockGridCRUDRepository, getMockAsPromise} from './common';
import { GridStoreServiceImpl } from '../service';
import { describe } from 'mocha';
const expect = chai.expect;
chai.use(chai_as_promised);
let should = chai.should();
const server = new GridStoreServiceImpl(getMockAsPromise());
server.listen(9999);
function clear(done : () => void) {
    server.repositoryAccess.then(repo => {
        repo.deleteAll().then(b => {
            done();
        });
    });
}

function createGridByNameRequest(name : string) {
    var res = new messages.getGridByNameRequest();
    res.setName(name);
    return res;
}

describe('Connection to GRPC server', function() {
    /*
    this.beforeAll(function() {
        server.listen(9999);
    });
    this.afterAll(function(done) {
        server.close(done)
    });
    */
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
        //server.listen(9999);
        clear(done);
    });
    this.afterAll(function(done) {
        client.close();
        clear(done);
    });

    it('Should retrieve an empty list without initial data', function(done) {
        var stream = client.getAllGrids(new messages.getAllGridsRequest());
        var arr : Array<messages.Grid> = [];
        stream.on('data', function(grid) {
            arr.push(grid);
        });
        stream.on('end', () => {
            expect(arr.length).to.be.eql(0);
            done();
        })
    });

    it('Should fail when gettting a non existing name', function(done) {
        var req = new messages.getGridByNameRequest();
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
});

describe('GRPC CreateGrid operations', function() {
    var client: services.GridStoreClient = new services.GridStoreClient(
        "localhost:9999",
        grpc.credentials.createInsecure()
      );
    this.beforeAll(function(done) {
        //server.listen(9999);
        clear(done);
    });
    this.afterAll(function(done) {
        client.close();
        clear(done);
    });
    it('Setup', function(done) {
        done();
    });
    it('Should suceed to create a grid', function(done) {
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
                done();
            }
        })
    })
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
                var getReq = new messages.getGridByNameRequest();
                getReq.setName(grid.getName());
                client.getGridByName(getReq, (e, r) => {
                    if(e){
                        done(e);
                    }
                    else{
                        expect(r?.getName()).to.be.eql(grid.getName());
                        expect(r?.getHeight()).to.be.eql(testGrid.height);
                        done();
                    }
                });
            }
        });
    });
});