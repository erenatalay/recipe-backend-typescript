import * as winston  from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'errors' },
    transports: [

      new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'src/logs/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'src/logs/combined.log'}),
    ],
  });

export default logger;