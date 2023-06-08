import * as express from "express";
import helmet from "helmet";
import * as fileUpload from "express-fileupload";
import * as path from "path";
import * as swaggerUi from "swagger-ui-express";
import config from "../config";
import routers from "../routes";
import errorHandler from "../middlewares/errorHandler";
const app = express();
const swaggerDocument = require("../../swagger_output.json");
config();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(helmet());
app.use(fileUpload());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routers);
app.use(errorHandler);
app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_PORT} Port Server Start`);
  app.use(errorHandler);
});
export default app;
