import mongoose from 'mongoose';
import { User } from '../models/user';

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'tk_oauth',
    autoIndex: true,
    autoCreate: true,
  });

  await User.create({
    username: 'joko212',
    nama: 'Joko Susilo',
    password: 'Joko123',
    alamat: 'Jalan Kebagusan',
  });

  await User.create({
    username: 'Agustina212',
    nama: 'Agustina Wilmar',
    password: 'Agustina123',
    alamat: 'Jalan Faedah',
  });
};

main();
