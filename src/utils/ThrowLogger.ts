import categoryLogger from "../logger/category";
import postLogger from "../logger/post";
import postPhotoLogger from "../logger/postPhoto";
import userLogger from "../logger/user";
import wishListLogger from "../logger/wishlist";

const ThrowLogger = (error, path) => {
  if (path === "/api/category") {
    const result = error;
    categoryLogger.log({
      level: "info",
      message: result,
    });

    return result;
  }
  if (path === "/api/post") {
    const result = error;
    postLogger.log({
      level: "info",
      message: result,
    });

    return result;
  }
  if (path === "/api/user") {
    const result = error;
    userLogger.log({
      level: "info",
      message: result,
    });

    return result;
  }
  if (path === "/api/wishlist") {
    const result = error;
    wishListLogger.log({
      level: "info",
      message: result,
    });

    return result;
  }
  if (path === "/api/post-photos") {
    const result = error;
    postPhotoLogger.log({
      level: "info",
      message: result,
    });

    return result;
  }
};

export default ThrowLogger;
