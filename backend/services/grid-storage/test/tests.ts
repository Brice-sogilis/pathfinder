import chai, { assert } from 'chai'
import chai_as_promised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chai_as_promised);
chai.should();

import {connectGridDatabase} from '../mongo-utils'
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