import chai, { assert } from 'chai'
import chai_as_promised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chai_as_promised);
chai.should();

import {connectGridDatabase, GridCRUDRepository, GridDAO, MongoGridCRUDRepository} from '../mongo-utils'
const DB_HOSTNAME_TEST : string = process.env.DB_HOSTNAME_TEST || '127.0.0.1'
const DB_PORT_TEST : number = (process.env.DB_PORT_TEST) ? parseInt(process.env.DB_PORT_TEST) : 27017

function TODO() {
    assert.fail("TODO");
}

describe('Database connection check', () => {
    it('Connect to mongo DB without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((res) => {
            expect(res).to.not.be.null;
            expect(res).to.not.be.undefined;
            res.close();
            done();
        });
    });
    
    it('Access a database without error', function(done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const db = clt.db('grid-storage');
            expect(db).to.not.be.null;
            expect(db).to.not.be.undefined;
            clt.close();
            done();
        });
    });

    it('Access a collection without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const db = clt.db('grid-storage');
            const grids = db.collection('grids')
            expect(grids).to.not.be.null;
            expect(grids).to.not.be.undefined;
            clt.close();
            done();
        });
    });
    
});

describe('Grid CRUD Repository single object tests', function () {
    const testGrid : GridDAO = new GridDAO("Test",["ABC","DEF","GHI"]);
    it('Creates a grid without error', function(done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const repo : GridCRUDRepository = new MongoGridCRUDRepository(clt);
            expect(repo.createGrid(testGrid)).to.be.true;
            expect(repo.listGrids()).not.to.be.empty;
            clt.close();
            done();
        });
    });

    it('Lists empty grids without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const repo : GridCRUDRepository = new MongoGridCRUDRepository(clt);
            expect(repo.listGrids()).to.be.empty;
            clt.close();
            done();
        });
    });

    it('Retrieves a correct grid after creation', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const repo : GridCRUDRepository = new MongoGridCRUDRepository(clt);
            repo.createGrid(testGrid);
            const gridBack = repo.getGridByName(testGrid.name);
            expect(gridBack.name).to.equals(testGrid.name);
            expect(gridBack.height).to.equals(testGrid.height);
            expect(gridBack.width).to.equals(testGrid.width);
            for(var i = 0;i<testGrid.height;i++){
                expect(gridBack.lines[i]).to.equals(testGrid.lines[i]);
            }
            clt.close();
            done();
        });
    });

    it('Deletes a grid after creation', function(done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((clt) => {
            const repo : GridCRUDRepository = new MongoGridCRUDRepository(clt);
            repo.createGrid(testGrid);
            expect(repo.listGrids()).not.to.be.empty;
            expect(repo.deleteGridByName(testGrid.name)).to.be.true;
            expect(repo.listGrids()).to.be.empty;
            clt.close();
            done();
        });
    });
});