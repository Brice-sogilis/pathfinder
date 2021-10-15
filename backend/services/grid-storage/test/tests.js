const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chai_as_promised);
chai.should();

const connectGridDatabase = require('../mongo-utils').connectGridDatabase
const DB_HOSTNAME_TEST = process.env.DB_HOSTNAME_TEST || '127.0.0.1'
const DB_PORT_TEST = process.env.DB_PORT_TEST || 27017
describe('Database connector', () => {
    it('Connects to a local mongo DB without error', function (done) {
        connectGridDatabase(DB_HOSTNAME_TEST, DB_PORT_TEST).then((res) => {
            expect(res).to.not.be.null;
            res.close();
            done();
        });
    });
});

