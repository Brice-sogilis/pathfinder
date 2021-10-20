import { Server, ServerCredentials, ServerUnaryCall, ServerErrorResponse } from '@grpc/grpc-js';
import { Ping, PingPongBody, Pong } from './pb/pingpong_pb';
import { PongServiceService } from './pb/pingpong_grpc_pb';

function sendPing(call : ServerUnaryCall<Ping, Pong>, callback: (err: ServerErrorResponse, res: Pong) => void) {
    var ping : PingPongBody = call.request.getPing();
    console.log("Receiving : " + ping.getTag());
    var pong = new PingPongBody();
    pong.setTag("Pong <= "+ping.getTag());
    pong.setId(42);
    var response = new Pong();
    response.setPong(pong);
    callback(null, response);
}

var server = new Server();
server.addService(PongServiceService, {sendPing: sendPing});
server.bindAsync('0.0.0.0:8888', ServerCredentials.createInsecure(), () => {server.start();})