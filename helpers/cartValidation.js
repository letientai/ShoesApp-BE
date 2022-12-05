const Joi = require("joi");
const { errorFunction } = require("../utils/errorFunction");

const validation = Joi.object({
  productId: Joi.string().required().trim(),
  productName: Joi.string().required(),
  productBrand: Joi.string().required(),
  price: Joi.number().min(0).required(),
  userId: Joi.string().required().trim(),
  image: Joi.string().required().trim(),
});

const cartValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    return res
      .status(403)
      .json(errorFunction(true, 403, `Error in Order Data: ${error.message}`));
  } else {
    next();
  }
};
module.exports = cartValidation;
