import * as Joi from "joi"

class PostValidation {
  createValidation() {
    return Joi.object({
      name: Joi.string().required().min(2).max(16),
      description: Joi.string().required().min(10),
      categoryId: Joi.array().items(Joi.number().min(1)).required(),
      photoId: Joi.array().items(Joi.number()),
    });
  }
  updateValidation() {
    return Joi.object({
      name: Joi.string().required().min(2).max(16),
      description: Joi.string().required().min(10),
      categoryId: Joi.array().items(Joi.number().min(1)).required(),
      photoId: Joi.array().items(Joi.number()),
    });
  }

}
export default new PostValidation();
