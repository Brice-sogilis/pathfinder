// GENERATED CODE -- DO NOT EDIT!

// package: grid
// file: pb/grid.proto

import * as pb_grid_pb from "../pb/grid_pb";
import * as grpc from "@grpc/grpc-js";

interface IGridStoreService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createGrid: grpc.MethodDefinition<pb_grid_pb.CreateGridRequest, pb_grid_pb.BooleanResponse>;
    getGridByName: grpc.MethodDefinition<pb_grid_pb.GetGridByNameRequest, pb_grid_pb.Grid>;
    getAllGrids: grpc.MethodDefinition<pb_grid_pb.GetAllGridsRequest, pb_grid_pb.Grid>;
    deleteGridByName: grpc.MethodDefinition<pb_grid_pb.DeleteGridByNameRequest, pb_grid_pb.BooleanResponse>;
    deleteAllGrids: grpc.MethodDefinition<pb_grid_pb.DeleteAllGridsRequest, pb_grid_pb.BooleanResponse>;
}

export const GridStoreService: IGridStoreService;

export interface IGridStoreServer extends grpc.UntypedServiceImplementation {
    createGrid: grpc.handleUnaryCall<pb_grid_pb.CreateGridRequest, pb_grid_pb.BooleanResponse>;
    getGridByName: grpc.handleUnaryCall<pb_grid_pb.GetGridByNameRequest, pb_grid_pb.Grid>;
    getAllGrids: grpc.handleServerStreamingCall<pb_grid_pb.GetAllGridsRequest, pb_grid_pb.Grid>;
    deleteGridByName: grpc.handleUnaryCall<pb_grid_pb.DeleteGridByNameRequest, pb_grid_pb.BooleanResponse>;
    deleteAllGrids: grpc.handleUnaryCall<pb_grid_pb.DeleteAllGridsRequest, pb_grid_pb.BooleanResponse>;
}

export class GridStoreClient extends grpc.Client {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);

    createGrid(argument: pb_grid_pb.CreateGridRequest, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    createGrid(argument: pb_grid_pb.CreateGridRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    createGrid(argument: pb_grid_pb.CreateGridRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;

    getGridByName(argument: pb_grid_pb.GetGridByNameRequest, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;
    getGridByName(argument: pb_grid_pb.GetGridByNameRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;
    getGridByName(argument: pb_grid_pb.GetGridByNameRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.Grid>): grpc.ClientUnaryCall;

    getAllGrids(argument: pb_grid_pb.GetAllGridsRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<pb_grid_pb.Grid>;
    getAllGrids(argument: pb_grid_pb.GetAllGridsRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<pb_grid_pb.Grid>;

    deleteGridByName(argument: pb_grid_pb.DeleteGridByNameRequest, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    deleteGridByName(argument: pb_grid_pb.DeleteGridByNameRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    deleteGridByName(argument: pb_grid_pb.DeleteGridByNameRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;

    deleteAllGrids(argument: pb_grid_pb.DeleteAllGridsRequest, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    deleteAllGrids(argument: pb_grid_pb.DeleteAllGridsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
    deleteAllGrids(argument: pb_grid_pb.DeleteAllGridsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<pb_grid_pb.BooleanResponse>): grpc.ClientUnaryCall;
}
