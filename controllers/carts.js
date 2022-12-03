const Carts = require("../models/carts");
const { errorFunction } = require("../utils/errorFunction");

const createCart = async (req, res, next) => {
  try {
    const cart = await Carts(req.body);
    cart
      .save()
      .then(
        res.status(201).json(errorFunction(false, 201, "Cart Created", cart))
      );
  } catch (error) {
    res.status(201).json(errorFunction(true, 403, "Error Creating Cart"));
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const allCarts = await Carts.find();
    if (allCarts.length > 0) {
      res
        .status(201)
        .json(errorFunction(false, 201, "Successfuly", allCarts.reverse()));
    } else {
      res.status(201).json(errorFunction(false, 201, "No results", []));
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "No results", []));
  }
};

const getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  try {
    const cart = await Carts.findById(cartId);
    if (cart) {
      res.status(200).json(errorFunction(false, 200, "Successfuly", cart));
    } else {
      res
        .status(200)
        .json(
          errorFunction(false, 204, "Cart does not exist in the database")
        );
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const editCart = (req, res, next) => {
  try {
    let cartId = req.params.cartId;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(404)
        .json(errorFunction(false, 400, `Data to update can not be empty!`));
    }
    Carts.findByIdAndUpdate(cartId, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res
          .status(404)
          .json(
            errorFunction(
              false,
              404,
              `Cannot update Cart with id=${cartId}. Maybe Cart was not found!`
            )
          );
      } else {
        getCartById(req, res, next);
      }
    });
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const removeCart = (req, res) => {
  try {
    let cartId = req.params.cartId;
    Carts.findByIdAndRemove(cartId).then(() => {
      res
        .status(200)
        .json(errorFunction(false, 200, "Cart Deleted Successfully!"));
    });
  } catch (error) {
    res
      .status(400)
      .json(errorFunction(true, 400, "User Deleted Unsuccessfully!"));
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  editCart,
  removeCart,
};
