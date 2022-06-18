import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Redis from './utils/redis';
import AuthRouter from './routes';
import cors from 'cors';
import { Server, ServerCredentials } from 'grpc';
import AuthTokenServer from './protoService';
import { AuthTokenService } from './proto/auth_grpc_pb';
config();

async function main() {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'tk_oauth',
    autoIndex: true,
    autoCreate: true,
  });

  await Redis.getInstance();

  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(AuthRouter);
  app.listen(3020, () => {
    console.log('App start at port 3020');
  });

  const server = new Server();
  server.addService(AuthTokenService, new AuthTokenServer());
  const port = 3021;
  const uri = `localhost:${port}`;
  console.log(`GRPC Listening on ${uri}`);
  server.bind(uri, ServerCredentials.createInsecure());
  server.start();
}

main();
