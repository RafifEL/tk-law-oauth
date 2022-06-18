import grpc from 'grpc';
import { AuthTokenClient } from './proto/auth_grpc_pb';

export default new AuthTokenClient(
  `localhost:3021`,
  grpc.credentials.createInsecure()
);
