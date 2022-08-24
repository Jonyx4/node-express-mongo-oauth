import mongoose from 'mongoose';
import logger from './logger.js';

const dbConnect = async (url = process.env.DATABASE) => {
  mongoose.connection.on('error', (err) => {
    logger.error(err);
  });

  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to MongoDB...');
  });

  mongoose.connection.on('connected', () => {
    logger.info('Connection with MongoDB stablished successfully');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected successfully');
  });

  mongoose.connection.on('reconnectFailed', () => {
    logger.error('Reconection with MongoDB failed');
  });

  try {
    await mongoose.connect(url);
  } catch (error) {
    logger.error(error);
  }
};

export default dbConnect;
