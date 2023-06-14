import * as winston from "winston"

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'error' },
    transports: [
      new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    ],
  });

  module.exports = logger;