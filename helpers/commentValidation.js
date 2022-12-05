const Joi = require("joi");
const { errorFunction } = require("../utils/errorFunction");

const validation = Joi.object({
  productId: Joi.string().required().trim(),
  userId: Joi.string().required(),
  userName: Joi.string().required(),
  comment: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
});

const commentValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    return res
      .status(403)
      .json(errorFunction(true, 403, `Error in Order Data: ${error.message}`));
  } else {
    next();
  }
};
module.exports = commentValidation;
