import chai, {assert} from 'chai'
import chai_as_promised from 'chai-as-promised';
import {connectGridDatabase, MongoGridCRUDRepository} from '../mongo_access';
import {GridCRUDRepository} from '../GridDAO'
import {testGrid} from './common'

const expect = chai.expect;
chai.use(chai_as_promised);
chai.should();

const DB_HOSTNAME_TEST: string = process.env.DB_HOSTNAME_TEST || '127.0.0.1'
const DB_PORT_TEST: number = (process.env.DB_PORT_TEST) ? parseInt(process.env.DB_PORT_TEST) : 27017

function TODO() {
    assert.fail("TODO");
}

async function clear() {
    await connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then(async function (clt) {
        const repo: GridCRUDRepository = new MongoGridCRUDRepository(clt);
        await repo.deleteAll();
    });
}

describe('Database connection check => Failure of these tests may indicate a bad configuration of the local mongoDB access, check DB_HOSTNAME_TEST and DB_PORT_TEST environment variables', () => {
    it('Connect to mongo DB without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((res) => {
            expect(res).to.not.be.null;
            expect(res).to.not.be.undefined;
            res.close();
            done();
        });
    });

    it('Access a database without error', function (done) {
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

async function createAGridWithoutError(repo: GridCRUDRepository, callback: () => void) {
    expect(await repo.createGrid(testGrid)).to.be.true;
    expect(await repo.listGrids()).not.to.be.empty;
    await repo.deleteAll();
    callback();
}

async function listEmptyGridsWithoutError(repo: GridCRUDRepository, callback: () => void) {
    expect(await repo.listGrids()).to.be.empty;
    await repo.deleteAll();
    callback();
}

async function retrievesACorrectGridAfterCreation(repo: GridCRUDRepository, callback: () => void) {
    await repo.createGrid(testGrid);
    const gridBack = await repo.getGridByName(testGrid.name);
    expect(gridBack).to.be.not.null;
    expect(gridBack!.name).to.equals(testGrid.name);
    expect(gridBack!.height).to.equals(testGrid.height);
    expect(gridBack!.width).to.equals(testGrid.width);
    for (let i = 0; i < testGrid.height; i++) {
        expect(gridBack!.lines[i]).to.equals(testGrid.lines[i]);
    }
    callback();
}

async function deletesGridAfterCreation(repo: GridCRUDRepository, callback: () => void) {
    await repo.createGrid(testGrid);
    expect(await repo.listGrids()).not.to.be.empty;
    expect(await repo.deleteGridByName(testGrid.name)).to.be.true;
    expect(await repo.listGrids()).to.be.empty;
    callback();
}

describe('Local Mongo GridCRUDRepository implementation', function () {
    beforeEach(async function () {
        return clear();
    });

    afterEach(async function () {
        return clear();
    });

    it('Creates a grid without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then(async (clt) => {
            const repo: GridCRUDRepository = new MongoGridCRUDRepository(clt);
            await createAGridWithoutError(repo, () => {
                clt.close();
                done();
            });
        });
    });

    it('Lists empty grids without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then(async (clt) => {
            const repo: GridCRUDRepository = new MongoGridCRUDRepository(clt);
            await listEmptyGridsWithoutError(repo, () => {
                clt.close();
                done();
            });
        });
    });

    it('Retrieves a correct grid after creation', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then(async (clt) => {
            const repo: GridCRUDRepository = new MongoGridCRUDRepository(clt);
            await retrievesACorrectGridAfterCreation(repo, () => {
                clt.close();
                done();
            });
        });
    });

    it('Deletes a grid after creation', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then(async (clt) => {
            const repo: GridCRUDRepository = new MongoGridCRUDRepository(clt);
            await deletesGridAfterCreation(repo, () => {
                clt.close();
                done();
            });
        });
    });
});

export {
    clear,
    testGrid,
    createAGridWithoutError,
    listEmptyGridsWithoutError,
    retrievesACorrectGridAfterCreation,
    deletesGridAfterCreation
}