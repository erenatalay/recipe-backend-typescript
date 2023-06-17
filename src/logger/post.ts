import * as winston  from "winston";

const postLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'post' },
    transports: [

      new winston.transports.File({ filename: 'src/logs/post/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'src/logs/post/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'src/logs/post/combined.log'}),
    ],
  });

export default postLogger;