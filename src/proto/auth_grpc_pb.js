// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_pb = require('./auth_pb.js');

function serialize_authToken_Token(arg) {
  if (!(arg instanceof auth_pb.Token)) {
    throw new Error('Expected argument of type authToken.Token');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_authToken_Token(buffer_arg) {
  return auth_pb.Token.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_authToken_TokenResource(arg) {
  if (!(arg instanceof auth_pb.TokenResource)) {
    throw new Error('Expected argument of type authToken.TokenResource');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_authToken_TokenResource(buffer_arg) {
  return auth_pb.TokenResource.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthTokenService = exports.AuthTokenService = {
  getTokenResource: {
    path: '/authToken.AuthToken/GetTokenResource',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.Token,
    responseType: auth_pb.TokenResource,
    requestSerialize: serialize_authToken_Token,
    requestDeserialize: deserialize_authToken_Token,
    responseSerialize: serialize_authToken_TokenResource,
    responseDeserialize: deserialize_authToken_TokenResource,
  },
};

exports.AuthTokenClient = grpc.makeGenericClientConstructor(AuthTokenService);
