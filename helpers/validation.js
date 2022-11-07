const Joi = require("joi");

const addProductSchema = Joi.object({
  productName: Joi.string().min(5).max(100).required(),
  productBrand: Joi.string().required(),
  type: Joi.string().required(),
  info: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number(),
  quantity: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()),
});

const addUserSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
  fistName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).allow(""),
  address: Joi.string().min(5).max(100).allow(""),
  avatar: Joi.string().allow(""),
});

module.exports = { addProductSchema, addUserSchema };
