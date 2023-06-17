import * as winston  from "winston";

const postPhotoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'postPhoto' },
    transports: [

      new winston.transports.File({ filename: 'src/logs/postPhoto/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'src/logs/postPhoto/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'src/logs/postPhoto/combined.log'}),
    ],
  });

export default postPhotoLogger;