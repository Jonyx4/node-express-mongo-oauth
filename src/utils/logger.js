import winston from 'winston';
import { consoleFormat } from 'winston-console-format';

const appName = process.env.APP_NAME || `default-app-name`;

const consoleFormatter = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
  winston.format.colorize({ all: true }),
  winston.format.padLevels(),
  consoleFormat({
    showMeta: true,
    inspectOptions: {
      depth: Infinity,
      colors: true,
      maxArrayLength: Infinity,
      breakLength: 120,
      compact: Infinity
    }
  })
);

class Logger {
  constructor() {
    this.winston = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: process.env.NODE_ENV === 'development' ? consoleFormatter : null,
      defaultMeta: { service: appName },
      transports: [new winston.transports.Console()]
    });
  }
}

const logger = new Logger().winston;

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

export default logger;
