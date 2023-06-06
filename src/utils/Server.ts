import * as express from "express";
import helmet from "helmet";
import * as fileUpload from "express-fileupload";
import * as path from "path";
import * as swaggerUi from "swagger-ui-express";
import config from "../config";
export const app = express();
import routers from "../routes";
import errorHandler from "../middlewares/errorHandler";
function createServer() {
    const app = express();
    const swaggerDocument = require('../../swagger_output.json')
    config()
    app.use(express.json());
    app.use("/uploads",express.static(path.join(__dirname,"./","uploads")));
    app.use(helmet());
    app.use(fileUpload());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
    
    app.use("/api", routers);
    //Error Handling
    app.use(errorHandler)

  return app;
}
export default createServer;