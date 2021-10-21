// GENERATED CODE -- DO NOT EDIT!

// package: grid
// file: pb/grid.proto

import * as pb_grid_pb from "../pb/grid_pb";
import * as grpc from "@grpc/grpc-js";

interface IGridStoreService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createGrid: grpc.MethodDefinition<pb_grid_pb.CreateGridRequest, pb_grid_pb.BooleanResponse>;
  getGridByName: grpc.MethodDefinition<pb_grid_pb.getGridByNameRequest, pb_grid_pb.Grid>;
  getAllGrids: grpc.MethodDefinition<pb_grid_pb.getAllGridsRequest, pb_grid_pb.Grid>;
  deleteAllGrids: grpc.MethodDefinition<pb_grid_pb.deleteAllGridsRequest, pb_grid_pb.BooleanResponse>;
}

export const GridStoreService: IGridStoreService;

export interface IGridStoreServer extends grpc.UntypedServiceImplementation {
  createGrid: grpc.handleUnaryCall<pb_grid_pb.CreateGridRequest, pb_grid_pb.BooleanResponse>;
  getGridByName: grpc.handleUnaryCall<pb_grid_pb.getGridByNameRequest, pb_grid_pb.Grid>;
  getAllGrids: grpc.handleServerStreamingCall<pb_grid_pb.getAllGridsRequest, pb_grid_pb.Grid>;
  deleteAllGrids: grpc.handleUnaryCall<pb_grid_pb.deleteAllGridsRequest, pb_grid_pb.BooleanResponse>;
}

export class GridStoreClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  createGrid(argument: pb_grid_pb.CreateGridRequest, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
  createGrid(argument: pb_grid_pb.CreateGridRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
  createGrid(argument: pb_grid_pb.CreateGridRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
  getGridByName(argument: pb_grid_pb.getGridByNameRequest, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;
  getGridByName(argument: pb_grid_pb.getGridByNameRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;
  getGridByName(argument: pb_grid_pb.getGridByNameRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;
  getAllGrids(argument: pb_grid_pb.getAllGridsRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<pb_grid_pb.Grid>;
  getAllGrids(argument: pb_grid_pb.getAllGridsRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<pb_grid_pb.Grid>;
  deleteAllGrids(argument: pb_grid_pb.deleteAllGridsRequest, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
  deleteAllGrids(argument: pb_grid_pb.deleteAllGridsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
  deleteAllGrids(argument: pb_grid_pb.deleteAllGridsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
}
