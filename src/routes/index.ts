import { Router } from "express";
import UserRouter from "./user";
import * as swaggerUi from "swagger-ui-express";
const swaggerFile = require("../../swagger_output.json");
class MainRouter {
  public router = Router();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.use(`/user`, UserRouter);
    this.router.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}
const getRouter = new MainRouter();
export default getRouter.router;
