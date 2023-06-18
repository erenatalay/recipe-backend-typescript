import { Request, Response, NextFunction } from "express";
import * as asyncErrorWrapper from "express-async-handler";
import SearchService from "../../elasticsearch/service/Search";
import CustomError from "../utils/CustomError";
class Search {
  search = asyncErrorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { q, page } = req.query;
      if (q.length === 0) {
        return next(
          new CustomError("Query length must be greater than 0.", 400)
        );
      }
      if (!page) {
        return next(
          new CustomError("Page query is required.", 400)
        );
      }
      try {
        const search = await SearchService.search({ q, page });
        res.status(200).json({
          success: true,
          data: search,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  );
}

export default new Search();
