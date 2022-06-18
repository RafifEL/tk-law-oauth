import { sendUnaryData, ServerUnaryCall, ServiceError } from 'grpc';
import { env } from 'process';
import { IAuthTokenServer } from './proto/auth_grpc_pb';
import { Token, TokenResource } from './proto/auth_pb';
import { Redis } from './utils/redis';
import Jwt from 'jsonwebtoken';

class AuthTokenServer implements IAuthTokenServer {
  async getTokenResource(
    call: ServerUnaryCall<Token>,
    callback: sendUnaryData<TokenResource>
  ) {
    const token = call.request.getToken();
    try {
      const decoded = Jwt.verify(token, env.TOKEN_SECRET || 'secret', {
        algorithms: ['HS256'],
      });

      const redis = await Redis.getInstance();
      const tokenPayload = await redis.getKey('accessToken', token);
      if (!tokenPayload) throw new Error('Token Invalid');

      const tokenData = decoded as Record<string, string>;

      const { username = '', nama = '', alamat = '' } = tokenData;
      const tokenResource = new TokenResource();
      tokenResource.setUsername((username as string) || '');
      tokenResource.setNama((nama as string) || '');
      tokenResource.setAlamat((alamat as string) || '');
      callback(null, tokenResource);
    } catch {
      const error: ServiceError = {
        name: 'Token Invalid',
        message: 'Token Invalid',
      };
      callback(error, null);
    }
  }
}

export default AuthTokenServer;
