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

export class GetGridByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetGridByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetGridByNameRequest): GetGridByNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetGridByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetGridByNameRequest;
  static deserializeBinaryFromReader(message: GetGridByNameRequest, reader: jspb.BinaryReader): GetGridByNameRequest;
}

export namespace GetGridByNameRequest {
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

export class GetAllGridsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllGridsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllGridsRequest): GetAllGridsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllGridsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllGridsRequest;
  static deserializeBinaryFromReader(message: GetAllGridsRequest, reader: jspb.BinaryReader): GetAllGridsRequest;
}

export namespace GetAllGridsRequest {
  export type AsObject = {
  }
}

export class DeleteAllGridsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllGridsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllGridsRequest): DeleteAllGridsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllGridsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllGridsRequest;
  static deserializeBinaryFromReader(message: DeleteAllGridsRequest, reader: jspb.BinaryReader): DeleteAllGridsRequest;
}

export namespace DeleteAllGridsRequest {
  export type AsObject = {
  }
}

export class DeleteGridByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteGridByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteGridByNameRequest): DeleteGridByNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteGridByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteGridByNameRequest;
  static deserializeBinaryFromReader(message: DeleteGridByNameRequest, reader: jspb.BinaryReader): DeleteGridByNameRequest;
}

export namespace DeleteGridByNameRequest {
  export type AsObject = {
    name: string,
  }
}

