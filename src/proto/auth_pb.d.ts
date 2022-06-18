// package: authToken
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TokenResource extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): TokenResource;
    getNama(): string;
    setNama(value: string): TokenResource;
    getAlamat(): string;
    setAlamat(value: string): TokenResource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenResource.AsObject;
    static toObject(includeInstance: boolean, msg: TokenResource): TokenResource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenResource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenResource;
    static deserializeBinaryFromReader(message: TokenResource, reader: jspb.BinaryReader): TokenResource;
}

export namespace TokenResource {
    export type AsObject = {
        username: string,
        nama: string,
        alamat: string,
    }
}

export class Token extends jspb.Message { 
    getToken(): string;
    setToken(value: string): Token;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Token.AsObject;
    static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Token;
    static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
    export type AsObject = {
        token: string,
    }
}
