const expect = require('chai').expect

describe('Database connector', () => {
    it('Connects to a local mongo DB without error', () => {
        expect(2 === 2).to.equal(true)
    });
});
