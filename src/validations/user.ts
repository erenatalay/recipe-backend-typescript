import * as Joi from "joi"

class UserValidation {
  createValidation() {
    return Joi.object({
      firstname: Joi.string().required().min(3),
      lastname: Joi.string().required().min(3),
      username: Joi.string().required().min(4),
      password: Joi.string().required().min(8),
      confirm_password: Joi.string().valid(Joi.ref("password")).required(),
      email: Joi.string().required().min(8).email(),
      gender: Joi.string().required(),
    });
  }
  loginValidation() {
    return Joi.object({
      password: Joi.string().required().min(8),
      email: Joi.string().required().min(8).email(),
    });
  }
  updateValidation(){
    return Joi.object({
      firstname: Joi.string().required().min(3),
      lastname: Joi.string().required().min(3),
      username: Joi.string().required().min(4),
      email: Joi.string().required().min(8).email(),
      gender: Joi.string().required(),
    });
  }
  
}
export default new UserValidation();