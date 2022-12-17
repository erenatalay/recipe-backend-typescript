import { Request, Response, NextFunction } from "express";
class Users {
  /**
 * This function comment is parsed by doctrine
 * Test Route
 * @route GET /user
 * @group foo - Operations about user
 * @operationId retrieveFooInfo
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response.model} 200 - An array of user info
 * @returns {Product.model}  default - Unexpected error
 * @returns {Array.<Point>} Point - Some description for point
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After -     date in UTC when token expires
 * @security JWT
 */
  getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    res.status(200).send({
      data: { id: 1, name: "Eren", surname: "Atalay" },
      message: "Successfully",
    });
  };
}

module.exports = new Users();
