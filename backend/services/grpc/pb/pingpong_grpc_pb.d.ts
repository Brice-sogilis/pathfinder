// GENERATED CODE -- DO NOT EDIT!

// package: pingpong
// file: pb/pingpong.proto

import * as pb_pingpong_pb from "../pb/pingpong_pb";
import * as grpc from "@grpc/grpc-js";

interface IPongServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sendPing: grpc.MethodDefinition<pb_pingpong_pb.Ping, pb_pingpong_pb.Pong>;
}

export const PongServiceService: IPongServiceService;

export interface IPongServiceServer extends grpc.UntypedServiceImplementation {
  sendPing: grpc.handleUnaryCall<pb_pingpong_pb.Ping, pb_pingpong_pb.Pong>;
}

export class PongServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sendPing(argument: pb_pingpong_pb.Ping, callback: grpc.requestCallback<pb_pingpong_pb.Pong>): grpc.ClientUnaryCall;
  sendPing(argument: pb_pingpong_pb.Ping, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_pingpong_pb.Pong>): grpc.ClientUnaryCall;
  sendPing(argument: pb_pingpong_pb.Ping, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_pingpong_pb.Pong>): grpc.ClientUnaryCall;
}
