var grpc = require('@grpc/grpc-js');
var messages = require('./pb/pingpong_pb');
var services = require('./pb/pingpong_grpc_pb');

function sendPing(call, callback) {
    var ping = call.request.getPing();
    console.log("Receiving : " + ping.getTag());
    var pong = new messages.PingPongBody();
    pong.setTag("Pong <= "+ping.getTag());
    
    pong.setId(42);
    var response = new messages.Pong();
    response.setPong(pong);
    callback(null, response);
}

var server = new grpc.Server();
server.addService(services.PongServiceService, {sendPing: sendPing});
server.bindAsync('0.0.0.0:8888', grpc.ServerCredentials.createInsecure(), () => {server.start();})