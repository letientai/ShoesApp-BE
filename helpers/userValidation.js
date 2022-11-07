const Joi = require("joi");
const { errorFunction } = require("../utils/errorFunction");

const validation = Joi.object({
  username: Joi.string().min(2).max(100).required().trim(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
    .required()
    .trim(),
  fistName: Joi.string().min(2).max(100).required().trim(),
  lastName: Joi.string().min(2).max(100).required().trim(),
  phone: Joi.string().required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .trim()
    .allow(""),
  address: Joi.string().min(5).max(100).allow("").trim(),
  avatar: Joi.string().allow("").trim(),
  role: Joi.string().required().trim(),
});

const userValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    return res
      .status(403)
      .json(errorFunction(true, 403, `Error in User Data: ${error.message}`));
  } else {
    next();
  }
};
module.exports = userValidation;
