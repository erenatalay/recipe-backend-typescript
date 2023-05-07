import { Router } from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import PostRouter from "./post";
import PostPhotosRouter from "./postPhoto";
import * as swaggerUi from "swagger-ui-express";
const swaggerFile = require("../../swagger_output.json");
class MainRouter {
  public router = Router();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.use(`/user`, UserRouter);
    this.router.use(`/category`, CategoryRouter);
    this.router.use(`/post`, PostRouter);
    this.router.use(`/post-photos`, PostPhotosRouter);
    this.router.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}
const getRouter = new MainRouter();
export default getRouter.router;
