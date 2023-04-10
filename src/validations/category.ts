import * as Joi from "joi"

class CategoryValidation {
  createValidation() {
    return Joi.object({
      name: Joi.string().required().min(2).max(16),
    });
  }

}
export default new CategoryValidation();
