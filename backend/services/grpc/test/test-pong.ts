import { PongServer } from "../pong";
import * as services from "../pb/pingpong_grpc_pb"
import * as messages from "../pb/pingpong_pb"
import * as grpc from "@grpc/grpc-js"
import { expect } from "chai";
var server = new PongServer();

describe('Connection to server', function () {
    this.beforeAll(function(done) {
        server.listen(8888, done);
    });
    this.afterAll(function(done) {
        server.server.tryShutdown(done);
    });
    it('Should create a client without error', function(done) {
        var client : services.PongServiceClient = new services.PongServiceClient("localhost:8888", grpc.credentials.createInsecure());
        client.close();
        done();
    });
    it('Should get a single response for unary call', function(done) {
        var client : services.PongServiceClient = new services.PongServiceClient("localhost:8888", grpc.credentials.createInsecure());
        var ping  = new messages.PingPongBody();
        ping.setId(42);
        ping.setTag("P");
        var req = new messages.Ping();
        req.setPing(ping);
        client.sendPing(req, (err, res) => {
            expect(res.getPong().getTag()).not.to.be.empty;
            client.close();
            done();
        });

    });
});