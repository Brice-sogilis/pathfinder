const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chai_as_promised);
chai.should();

const connectGridDatabase = require('../mongo-utils').connectGridDatabase

describe('Database connector', () => {
    it('Connects to a local mongo DB without error', function (done) {
        connectGridDatabase().then((res) => {
            expect(res).to.not.be.null;
            res.close();
            done();
        });
    });
});

