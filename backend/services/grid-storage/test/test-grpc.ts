import chai from 'chai'
import chai_as_promised from 'chai-as-promised';
import * as messages from "../pb/grid_pb";
import * as services from "../pb/grid_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import {getMockAsPromise, testGrid} from './common';
import {createAGridWithoutError, deletesGridAfterCreation, retrievesACorrectGridAfterCreation} from './test-database';
import {GridRepositoryRPCWrapper, gridRPCasDAO, GridStoreServiceImpl} from '../service';
import {describe} from 'mocha';
import {GridDAO} from '../GridDAO';

const expect = chai.expect;
chai.use(chai_as_promised);
const server = new GridStoreServiceImpl(getMockAsPromise());

function clear(callback: () => void) {
    server.repositoryAccess.then(repo => {
        repo.deleteAll().then(_ => {
            callback();
        });
    });
}

function createGridByNameRequest(name: string) {
    const res = new messages.GetGridByNameRequest();
    res.setName(name);
    return res;
}

function getLocalClient(port : number) : services.GridStoreClient {
    return new services.GridStoreClient(
        `localhost:${port}`,
        grpc.credentials.createInsecure()
    );
}

describe('Connection to GRPC server => Failure of these tests may indicate a wrong configuration, check that the local host accept internal communication to port 9999', function () {
    this.beforeAll(function (done) {
        server.listen(9999, done);
    });
    this.afterAll(function (done) {
        server.close(done);
    });

    it('Should create a client without error', function () {
        const client = getLocalClient(9999);
        client.close();
    });
});

describe('GRPC GetGrid Operations', function () {
    const client: services.GridStoreClient = getLocalClient(9999);

    this.beforeAll(function (done) {
        server.listen(9999, () => clear(done));
    });

    this.afterAll(function (done) {
        client.close();
        server.forceClose();
        clear(done);
    });

    it('Should retrieve an empty list without initial data', function (done) {
        const stream = client.getAllGrids(new messages.GetAllGridsRequest());
        const arr: Array<messages.Grid> = [];
        stream.on('data', function (grid) {
            arr.push(grid);
        });
        stream.on('end', () => {
            expect(arr.length).to.be.eql(0);
            done();
        })
    });

    it('Should fail when getting a non existing name', function (done) {
        const req = new messages.GetGridByNameRequest();
        req.setName("Unknown_Test_Name");
        client.getGridByName(req, (err, _) => {
            if (err) {
                expect(err.code).not.to.be.eql(12, "Service should implement this method");
                done();
            } else {
                done("Error");
            }
        });
    });

    it('Should return an existing grid with identical name', function (done) {
        server.repositoryAccess.then(repo => {
            repo.createGrid(testGrid).then(_ => {
                client.getGridByName(createGridByNameRequest(testGrid.name), async (err, res) => {
                    if (err) {
                        await (await server.repositoryAccess).deleteAll();
                        done(err);
                    } else {
                        expect(res?.getName()).to.be.eql(testGrid.name);
                        await (await server.repositoryAccess).deleteAll();
                        done();
                    }
                });
            });
        });
    });

    it('Should return a list containing all the grids registered in the repository', function (done) {
        const testGridAltered = new GridDAO(testGrid.name + "Bis", testGrid.lines);
        server.repositoryAccess.then(repo => {
            repo.createGrid(testGrid).then(_ => repo.createGrid(testGridAltered).then(_ => {
                const req = new messages.GetAllGridsRequest();
                const gridStream = client.getAllGrids(req);
                const gridArray: Array<GridDAO> = [];
                gridStream.on('data', (grid: messages.Grid) => {
                    gridArray.push(gridRPCasDAO(grid));
                });
                gridStream.on('end', () => {
                    expect(gridArray.length).to.be.greaterThan(0);
                    expect(gridArray.length).to.be.eql(2);
                    repo.deleteAll().then(_ => {
                        done();
                    });
                });
            }));
        });
    })
});

describe('GRPC CreateGrid operations', function () {
    const client: services.GridStoreClient = getLocalClient(9999);

    this.beforeAll(function (done) {
        server.listen(9999, () => clear(done));
    });

    this.afterAll(function (done) {
        client.close();
        server.forceClose();
        clear(done);
    });

    it('Setup', function (done) {
        done();
    });

    it('Should succeed to create a grid', function (done) {
        const grid = new messages.Grid();
        grid.setName(testGrid.name);
        grid.setLinesList(testGrid.lines);
        grid.setHeight(testGrid.height);
        grid.setWidth(testGrid.width);
        const req = new messages.CreateGridRequest();
        req.setGrid(grid);
        client.createGrid(req, (err, bool) => {
            if (err || !bool?.getOk()) {
                done(new Error());
            } else {
                done();
            }
        });
    });

    it('Should create an identical grid to the argument', function (done) {
        const req = new messages.CreateGridRequest();
        const grid = new messages.Grid();
        grid.setName(testGrid.name);
        grid.setLinesList(testGrid.lines);
        grid.setHeight(testGrid.height);
        grid.setWidth(testGrid.width);
        req.setGrid(grid);
        client.createGrid(req, (err, res) => {
            if (err) {
                done(err);
            } else {
                expect(res?.getOk()).to.be.true;
                const getReq = new messages.GetGridByNameRequest();
                getReq.setName(grid.getName());
                client.getGridByName(getReq, (error, result) => {
                    if (error) {
                        done(error);
                    } else {
                        expect(result?.getName()).to.be.eql(grid.getName());
                        expect(result?.getHeight()).to.be.eql(testGrid.height);
                        done();
                    }
                });
            }
        });
    });
});

describe('CRUD GRPC Wrapper', function () {
    const client: services.GridStoreClient = getLocalClient(9999);
    const noop = () => {
    };

    const repo = new GridRepositoryRPCWrapper(client);

    this.beforeAll(function (done) {
        server.listen(9999, () => clear(done));
    });

    beforeEach(function (done) {
        return clear(done);
    });

    afterEach(function (done) {
        return clear(done);
    });

    this.afterAll(function (done) {
        server.forceClose();
        clear(done);
    });
    it('Lists empty grids without error', function () {
        return createAGridWithoutError(repo, noop)
    });

    it('Creates a grid without error', function () {
        return createAGridWithoutError(repo, noop);
    });

    it('Retrieves a correct grid after creation', function () {
        return retrievesACorrectGridAfterCreation(repo, noop);
    });

    it('Deletes a grid after creation', function () {
        return deletesGridAfterCreation(repo, noop);
    });

});