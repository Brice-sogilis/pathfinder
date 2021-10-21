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

function serialize_grid_Grid(arg) {
  if (!(arg instanceof pb_grid_pb.Grid)) {
    throw new Error('Expected argument of type grid.Grid');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_Grid(buffer_arg) {
  return pb_grid_pb.Grid.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_deleteAllGridsRequest(arg) {
  if (!(arg instanceof pb_grid_pb.deleteAllGridsRequest)) {
    throw new Error('Expected argument of type grid.deleteAllGridsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_deleteAllGridsRequest(buffer_arg) {
  return pb_grid_pb.deleteAllGridsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_getAllGridsRequest(arg) {
  if (!(arg instanceof pb_grid_pb.getAllGridsRequest)) {
    throw new Error('Expected argument of type grid.getAllGridsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_getAllGridsRequest(buffer_arg) {
  return pb_grid_pb.getAllGridsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grid_getGridByNameRequest(arg) {
  if (!(arg instanceof pb_grid_pb.getGridByNameRequest)) {
    throw new Error('Expected argument of type grid.getGridByNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grid_getGridByNameRequest(buffer_arg) {
  return pb_grid_pb.getGridByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
    requestType: pb_grid_pb.getGridByNameRequest,
    responseType: pb_grid_pb.Grid,
    requestSerialize: serialize_grid_getGridByNameRequest,
    requestDeserialize: deserialize_grid_getGridByNameRequest,
    responseSerialize: serialize_grid_Grid,
    responseDeserialize: deserialize_grid_Grid,
  },
  getAllGrids: {
    path: '/grid.GridStore/getAllGrids',
    requestStream: false,
    responseStream: true,
    requestType: pb_grid_pb.getAllGridsRequest,
    responseType: pb_grid_pb.Grid,
    requestSerialize: serialize_grid_getAllGridsRequest,
    requestDeserialize: deserialize_grid_getAllGridsRequest,
    responseSerialize: serialize_grid_Grid,
    responseDeserialize: deserialize_grid_Grid,
  },
  deleteAllGrids: {
    path: '/grid.GridStore/deleteAllGrids',
    requestStream: false,
    responseStream: false,
    requestType: pb_grid_pb.deleteAllGridsRequest,
    responseType: pb_grid_pb.BooleanResponse,
    requestSerialize: serialize_grid_deleteAllGridsRequest,
    requestDeserialize: deserialize_grid_deleteAllGridsRequest,
    responseSerialize: serialize_grid_BooleanResponse,
    responseDeserialize: deserialize_grid_BooleanResponse,
  },
};

exports.GridStoreClient = grpc.makeGenericClientConstructor(GridStoreService);
