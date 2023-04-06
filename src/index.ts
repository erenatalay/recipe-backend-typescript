import * as express from "express";
import config from "./config";
const app = express();
import routers from "./routes";
import errorHandler from "./middlewares/errorHandler";
app.use(express.json());
config();

app.use("/api", routers);
app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_PORT} Port Server Start`);
  app.use(errorHandler);
});
