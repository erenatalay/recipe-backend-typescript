import { Router } from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import PostRouter from "./post";
import PostPhotosRouter from "./postPhoto";
import WishListRouter from "./whislist";
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
    this.router.use(`/wishlist`, WishListRouter);
  }
}
const getRouter = new MainRouter();
export default getRouter.router;
