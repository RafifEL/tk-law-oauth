// package: authToken
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as auth_pb from "./auth_pb";

interface IAuthTokenService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getTokenResource: IAuthTokenService_IGetTokenResource;
}

interface IAuthTokenService_IGetTokenResource extends grpc.MethodDefinition<auth_pb.Token, auth_pb.TokenResource> {
    path: "/authToken.AuthToken/GetTokenResource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.Token>;
    requestDeserialize: grpc.deserialize<auth_pb.Token>;
    responseSerialize: grpc.serialize<auth_pb.TokenResource>;
    responseDeserialize: grpc.deserialize<auth_pb.TokenResource>;
}

export const AuthTokenService: IAuthTokenService;

export interface IAuthTokenServer {
    getTokenResource: grpc.handleUnaryCall<auth_pb.Token, auth_pb.TokenResource>;
}

export interface IAuthTokenClient {
    getTokenResource(request: auth_pb.Token, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
    getTokenResource(request: auth_pb.Token, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
    getTokenResource(request: auth_pb.Token, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
}

export class AuthTokenClient extends grpc.Client implements IAuthTokenClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getTokenResource(request: auth_pb.Token, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
    public getTokenResource(request: auth_pb.Token, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
    public getTokenResource(request: auth_pb.Token, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.TokenResource) => void): grpc.ClientUnaryCall;
}
