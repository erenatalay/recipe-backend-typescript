import * as express from "express";
import config from "./config";
const app = express();
import routers from "./routes";
import errorHandler from "./middlewares/errorHandler";
import helmet from "helmet";
import * as fileUpload from "express-fileupload";
import * as path from "path";

app.use(express.json());
config();
app.use("/uploads",express.static(path.join(__dirname,"./","uploads")));
app.use(helmet());
app.use(fileUpload());
app.use("/api", routers);
app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_PORT} Port Server Start`);
  app.use(errorHandler);
});
