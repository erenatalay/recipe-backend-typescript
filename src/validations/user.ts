const Joi = require("joi");
class UserValidation {
  createValidation() {
    return Joi.object({
      full_name: Joi.string().required().min(3),
      password: Joi.string().required().min(8),
      email: Joi.string().required().min(8).email(),
    });
  }
  loginValidation() {
    return Joi.object({
      password: Joi.string().required().min(8),
      email: Joi.string().required().min(8).email(),
    });
  }
}
module.exports = new UserValidation();