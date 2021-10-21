import chai from 'chai'
import chai_as_promised from 'chai-as-promised';
import chaiHttp from 'chai-http';
const expect = chai.expect;
chai.use(chai_as_promised);
chai.use(chaiHttp);
let should = chai.should();

import {app} from '../service';
import {clear, testGrid} from './test-database';
describe("GET /grid", function() {
    beforeEach(async function() {
        return clear();
    });
    afterEach(async function() {
        return clear();
    });
    it("Should return OK status and an empty list if no grid was created", function(done) {
        chai.request(app)
            .get("/grid")
            .end(function(err,res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe("POST /grid", function() {
    beforeEach(async function() {
        return clear();
    });
    afterEach(async function() {
        return clear();
    });
    it("Should return CREATED status when sending a valid grid", function(done) {
        chai.request(app)
        .post("/grid")
        .send(testGrid)
        .end(function(err, res){
            res.should.have.status(201);
            done();
        });
    });
    it("Should create a grid identical to request body", function(done) {
        chai.request(app)
        .post("/grid")
        .send(testGrid)
        .end(function(_, __){
            chai.request(app).get("/grid/"+testGrid.name)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.name.should.be.eql(testGrid.name);
                for(var i = 0; i < res.body.lines.length; i++) {
                    res.body.lines[i].should.be.eql(testGrid.lines[i]);
                }
                done();
            });
        });
    });
});

describe("DEl /grid/:name", function() {
    beforeEach(async function() {
        return clear();
    });
    afterEach(async function() {
        return clear();
    });
    it("Should fail when the requested name is not in the database", function(done){
        chai.request(app).delete("/grid/someName").end((err, res) => {res.should.have.status(404);done();});
    });
    it("Should delete the grid identified by :name", function(done){
        chai.request(app).post("/grid").send(testGrid).end((err, res) => {
            chai.request(app).delete("/grid/"+testGrid.name).end((err, res) => {res.should.have.status(200);done();});
        })
    })
});