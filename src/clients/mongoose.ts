import mongoose from 'mongoose';

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  const uri: string = process.env.MONGODB_URI;
  await mongoose.connect(uri);
};

dbConnect().catch((err) => console.log(err));

export default dbConnect;
