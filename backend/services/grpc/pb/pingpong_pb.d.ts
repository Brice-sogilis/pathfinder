// package: pingpong
// file: pb/pingpong.proto

import * as jspb from "google-protobuf";

export class PingPongBody extends jspb.Message {
  getTag(): string;
  setTag(value: string): void;

  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingPongBody.AsObject;
  static toObject(includeInstance: boolean, msg: PingPongBody): PingPongBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingPongBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingPongBody;
  static deserializeBinaryFromReader(message: PingPongBody, reader: jspb.BinaryReader): PingPongBody;
}

export namespace PingPongBody {
  export type AsObject = {
    tag: string,
    id: number,
  }
}

export class Ping extends jspb.Message {
  hasPing(): boolean;
  clearPing(): void;
  getPing(): PingPongBody | undefined;
  setPing(value?: PingPongBody): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
    ping?: PingPongBody.AsObject,
  }
}

export class Pong extends jspb.Message {
  hasPong(): boolean;
  clearPong(): void;
  getPong(): PingPongBody | undefined;
  setPong(value?: PingPongBody): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pong.AsObject;
  static toObject(includeInstance: boolean, msg: Pong): Pong.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pong, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pong;
  static deserializeBinaryFromReader(message: Pong, reader: jspb.BinaryReader): Pong;
}

export namespace Pong {
  export type AsObject = {
    pong?: PingPongBody.AsObject,
  }
}

