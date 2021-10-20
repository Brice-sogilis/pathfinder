var messages = require('./pb/pingpong_pb');
var services = require('./pb/pingpong_grpc_pb');

var grpc = require('@grpc/grpc-js');

var client = new services.PongServiceClient("localhost:8888", grpc.credentials.createInsecure());
var ping = new messages.PingPongBody();
ping.setTag("Hey !");
ping.setId(666);
var request = new messages.Ping();
request.setPing(ping);

client.sendPing(request, function(err, res) {
    console.log("Ping pong exchange : \n\t"+res.getPong().getTag());
});
