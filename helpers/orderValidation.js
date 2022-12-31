const Joi = require("joi");
const { errorFunction } = require("../utils/errorFunction");

const validation = Joi.object({
  productId: Joi.string().required().trim(),
  productName: Joi.string().required(),
  productBrand: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  type: Joi.string().required(),
  userId: Joi.string().required().trim(),
  username: Joi.string().min(2).max(100).required(),
  image: Joi.string().required().trim(),
  phone: Joi.string().required().trim(),
  address: Joi.string().required().min(5).max(100),
  orderStatus: Joi.number().required().min(0).max(5),
  cartId: Joi.optional()
});

const orderValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    return res
      .status(403)
      .json(errorFunction(true, 403, `Error in Order Data: ${error.message}`));
  } else {
    next();
  }
};
module.exports = orderValidation;
