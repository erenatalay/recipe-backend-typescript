import * as Joi from "joi";

class WishListValidation {
  createValidation() {
    return Joi.object({
      postId: Joi.number().required(),
    });
  }

}
export default new WishListValidation();
