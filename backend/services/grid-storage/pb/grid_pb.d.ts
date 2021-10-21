// package: grid
// file: pb/grid.proto

import * as jspb from "google-protobuf";

export class Grid extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearLinesList(): void;
  getLinesList(): Array<string>;
  setLinesList(value: Array<string>): void;
  addLines(value: string, index?: number): string;

  getHeight(): number;
  setHeight(value: number): void;

  getWidth(): number;
  setWidth(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Grid.AsObject;
  static toObject(includeInstance: boolean, msg: Grid): Grid.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Grid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Grid;
  static deserializeBinaryFromReader(message: Grid, reader: jspb.BinaryReader): Grid;
}

export namespace Grid {
  export type AsObject = {
    name: string,
    linesList: Array<string>,
    height: number,
    width: number,
  }
}

export class CreateGridRequest extends jspb.Message {
  hasGrid(): boolean;
  clearGrid(): void;
  getGrid(): Grid | undefined;
  setGrid(value?: Grid): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateGridRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateGridRequest): CreateGridRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateGridRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateGridRequest;
  static deserializeBinaryFromReader(message: CreateGridRequest, reader: jspb.BinaryReader): CreateGridRequest;
}

export namespace CreateGridRequest {
  export type AsObject = {
    grid?: Grid.AsObject,
  }
}

export class getGridByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): getGridByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: getGridByNameRequest): getGridByNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: getGridByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): getGridByNameRequest;
  static deserializeBinaryFromReader(message: getGridByNameRequest, reader: jspb.BinaryReader): getGridByNameRequest;
}

export namespace getGridByNameRequest {
  export type AsObject = {
    name: string,
  }
}

export class BooleanResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BooleanResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BooleanResponse): BooleanResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BooleanResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BooleanResponse;
  static deserializeBinaryFromReader(message: BooleanResponse, reader: jspb.BinaryReader): BooleanResponse;
}

export namespace BooleanResponse {
  export type AsObject = {
    ok: boolean,
  }
}

export class getAllGridsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): getAllGridsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: getAllGridsRequest): getAllGridsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: getAllGridsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): getAllGridsRequest;
  static deserializeBinaryFromReader(message: getAllGridsRequest, reader: jspb.BinaryReader): getAllGridsRequest;
}

export namespace getAllGridsRequest {
  export type AsObject = {
  }
}

export class deleteAllGridsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): deleteAllGridsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: deleteAllGridsRequest): deleteAllGridsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: deleteAllGridsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): deleteAllGridsRequest;
  static deserializeBinaryFromReader(message: deleteAllGridsRequest, reader: jspb.BinaryReader): deleteAllGridsRequest;
}

export namespace deleteAllGridsRequest {
  export type AsObject = {
  }
}

