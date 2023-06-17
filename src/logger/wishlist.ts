import * as winston  from "winston";

const wishListLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'wishlist' },
    transports: [

      new winston.transports.File({ filename: 'src/logs/wishlist/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'src/logs/wishlist/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'src/logs/wishlist/combined.log'}),
    ],
  });

export default wishListLogger;