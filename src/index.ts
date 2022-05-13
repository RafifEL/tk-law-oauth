import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Redis from './utils/redis';
import AuthRouter from './routes';
import cors from 'cors';
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
}

main();
