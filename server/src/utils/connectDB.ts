import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/performanceData');

    console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
