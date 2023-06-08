import app from "./utils/Server";
import errorHandler from "./middlewares/errorHandler";


app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_PORT} Port Server Start`);
  app.use(errorHandler);
});