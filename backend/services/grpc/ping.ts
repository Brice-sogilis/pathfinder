import * as messages from './pb/pingpong_pb';
import * as services from './pb/pingpong_grpc_pb'
import * as grpc from '@grpc/grpc-js';

var client : services.PongServiceClient = new services.PongServiceClient("localhost:8888", grpc.credentials.createInsecure());
var ping : messages.PingPongBody = new messages.PingPongBody();
ping.setTag("Hey !");
ping.setId(666);
var request : messages.Ping = new messages.Ping();
request.setPing(ping);

client.sendPing(request, function(err, res) {
    console.log("Ping pong exchange : \n\t"+res.getPong().getTag());
});
