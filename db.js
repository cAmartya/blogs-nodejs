import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
// const conn = mongoose.createConnection(MONGO_URL);
// const connectToMongo = () => {
//   conn.on('connected', () => console.log('connected'));
//   conn.on('open', () => console.log('open'));
//   conn.on('disconnected', () => console.log('disconnected'));
//   conn.on('reconnected', () => console.log('reconnected'));
//   conn.on('disconnecting', () => console.log('disconnecting'));
//   conn.on('close', () => console.log('close'));
// };

async function connectToMongo(){
  try {
      await mongoose.connect(MONGO_URL);
      console.log("connected to MongoDB");
  }
  catch {
      console.log(error);
  }
}


export default connectToMongo;