import express, { Request, Response, NextFunction } from 'express';
import { User } from './models/user';
import Jwt from 'jsonwebtoken';
import { env } from 'process';
import Redis from './utils/redis';
import AuthClient from './protoClient';
import { ServiceError } from 'grpc';
import { Token, TokenResource } from './proto/auth_pb';

interface LoginReq extends Request {
  body: {
    username: string;
    password: string;
  };
}

interface AuthorizedReq extends Request {
  auth?: {
    user: Record<string, any>;
  };
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(403).json({
        error: 'no_token',
        description: 'Access Token Required',
      });
    }

    const [method, token] = authorization.split(' ');

    if (method !== 'Bearer') {
      return res.status(403).json({
        error: 'wrong_method',
        description: 'Not Bearer Auth Method',
      });
    }

    if (!token) {
      return res.status(403).json({
        error: 'no_token',
        description: 'Access Token Required',
      });
    }

    const decoded = Jwt.verify(token, env.TOKEN_SECRET || 'secret', {
      algorithms: ['HS256'],
    });

    const redis = await Redis.getInstance();
    const tokenPayload = await redis.getKey('accessToken', token);
    if (!tokenPayload) throw new Error('Token Invalid');

    (req as AuthorizedReq).auth = { user: decoded as Record<string, unknown> };
  } catch (err) {
    return res.status(403).json({
      error: 'invalid_token',
      description: 'Invalid Token',
    });
  }
  return next();
};

const AuthRouter = express.Router();

AuthRouter.post('/login', async (req: LoginReq, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: 'missing_body',
        description: 'Username / Password missing',
      });
    }

    const user = await User.findOne({ username });

    const passwordCheck = user?.validatePassword(password);

    if (!passwordCheck) {
      return res.status(401).json({
        error: 'wrong_credentials',
        description: 'Wrong username / password',
      });
    }

    const dataSigned = {
      username: user?.username,
      nama: user?.nama,
      alamat: user?.alamat,
    };

    const accessToken = Jwt.sign(dataSigned, env.TOKEN_SECRET || 'secret', {
      expiresIn: '8h',
      algorithm: 'HS256',
    });

    const redis = await Redis.getInstance();

    await redis.setKeyWithExpiry(
      'accessToken',
      accessToken,
      JSON.stringify(dataSigned),
      8 * 3600
    );

    return res.json({
      access_token: accessToken,
      expires_in: 8 * 3600,
      token_type: 'Bearer',
      user: dataSigned,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: 'internal_server_error',
      description: 'Internal Server Error',
    });
  }
});

AuthRouter.post(
  '/logout',
  verifyToken,
  async (req: AuthorizedReq, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const [, token] = authorization.split(' ');
      const redis = await Redis.getInstance();
      await redis.delKey('accessToken', token);
    }

    return res.send('ok');
  }
);

AuthRouter.get(
  '/token/resource',
  verifyToken,
  async (req: AuthorizedReq, res: Response) => {
    return res.json({
      data: req?.auth?.user,
    });
  }
);

export default AuthRouter;
