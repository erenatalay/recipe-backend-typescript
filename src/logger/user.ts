import * as winston  from "winston";

const userLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user' },
    transports: [

      new winston.transports.File({ filename: 'src/logs/user/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'src/logs/user/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'src/logs/user/combined.log'}),
    ],
  });

export default userLogger;