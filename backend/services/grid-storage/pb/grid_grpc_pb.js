// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var pb_grid_pb = require('../pb/grid_pb.js');

function serialize_grid_BooleanResponse(arg) {
    if (!(arg instanceof pb_grid_pb.BooleanResponse)) {
        throw new Error('Expected argument of type grid.BooleanResponse');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_BooleanResponse(buffer_arg) {
    return pb_grid_pb.BooleanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_CreateGridRequest(arg) {
    if (!(arg instanceof pb_grid_pb.CreateGridRequest)) {
        throw new Error('Expected argument of type grid.CreateGridRequest');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_CreateGridRequest(buffer_arg) {
    return pb_grid_pb.CreateGridRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_DeleteAllGridsRequest(arg) {
    if (!(arg instanceof pb_grid_pb.DeleteAllGridsRequest)) {
        throw new Error('Expected argument of type grid.DeleteAllGridsRequest');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_DeleteAllGridsRequest(buffer_arg) {
    return pb_grid_pb.DeleteAllGridsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_DeleteGridByNameRequest(arg) {
    if (!(arg instanceof pb_grid_pb.DeleteGridByNameRequest)) {
        throw new Error('Expected argument of type grid.DeleteGridByNameRequest');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_DeleteGridByNameRequest(buffer_arg) {
    return pb_grid_pb.DeleteGridByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_GetAllGridsRequest(arg) {
    if (!(arg instanceof pb_grid_pb.GetAllGridsRequest)) {
        throw new Error('Expected argument of type grid.GetAllGridsRequest');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_GetAllGridsRequest(buffer_arg) {
    return pb_grid_pb.GetAllGridsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_GetGridByNameRequest(arg) {
    if (!(arg instanceof pb_grid_pb.GetGridByNameRequest)) {
        throw new Error('Expected argument of type grid.GetGridByNameRequest');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_GetGridByNameRequest(buffer_arg) {
    return pb_grid_pb.GetGridByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_Grid(arg) {
    if (!(arg instanceof pb_grid_pb.Grid)) {
        throw new Error('Expected argument of type grid.Grid');
    }
    return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_Grid(buffer_arg) {
    return pb_grid_pb.Grid.deserializeBinary(new Uint8Array(buffer_arg));
}


var GridStoreService = exports.GridStoreService = {
    createGrid: {
        path: '/grid.GridStore/createGrid',
        requestStream: false,
        responseStream: false,
        requestType: pb_grid_pb.CreateGridRequest,
        responseType: pb_grid_pb.BooleanResponse,
        requestSerialize: serialize_grid_CreateGridRequest,
        requestDeserialize: deserialize_grid_CreateGridRequest,
        responseSerialize: serialize_grid_BooleanResponse,
        responseDeserialize: deserialize_grid_BooleanResponse,
    },
    getGridByName: {
        path: '/grid.GridStore/getGridByName',
        requestStream: false,
        responseStream: false,
        requestType: pb_grid_pb.GetGridByNameRequest,
        responseType: pb_grid_pb.Grid,
        requestSerialize: serialize_grid_GetGridByNameRequest,
        requestDeserialize: deserialize_grid_GetGridByNameRequest,
        responseSerialize: serialize_grid_Grid,
        responseDeserialize: deserialize_grid_Grid,
    },
    getAllGrids: {
        path: '/grid.GridStore/getAllGrids',
        requestStream: false,
        responseStream: true,
        requestType: pb_grid_pb.GetAllGridsRequest,
        responseType: pb_grid_pb.Grid,
        requestSerialize: serialize_grid_GetAllGridsRequest,
        requestDeserialize: deserialize_grid_GetAllGridsRequest,
        responseSerialize: serialize_grid_Grid,
        responseDeserialize: deserialize_grid_Grid,
    },
    deleteGridByName: {
        path: '/grid.GridStore/deleteGridByName',
        requestStream: false,
        responseStream: false,
        requestType: pb_grid_pb.DeleteGridByNameRequest,
        responseType: pb_grid_pb.BooleanResponse,
        requestSerialize: serialize_grid_DeleteGridByNameRequest,
        requestDeserialize: deserialize_grid_DeleteGridByNameRequest,
        responseSerialize: serialize_grid_BooleanResponse,
        responseDeserialize: deserialize_grid_BooleanResponse,
    },
    deleteAllGrids: {
        path: '/grid.GridStore/deleteAllGrids',
        requestStream: false,
        responseStream: false,
        requestType: pb_grid_pb.DeleteAllGridsRequest,
        responseType: pb_grid_pb.BooleanResponse,
        requestSerialize: serialize_grid_DeleteAllGridsRequest,
        requestDeserialize: deserialize_grid_DeleteAllGridsRequest,
        responseSerialize: serialize_grid_BooleanResponse,
        responseDeserialize: deserialize_grid_BooleanResponse,
    },
};

exports.GridStoreClient = grpc.makeGenericClientConstructor(GridStoreService);
