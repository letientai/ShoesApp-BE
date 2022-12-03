const express = require("express");
const route = express.Router();
const cors = require("cors");
const app = express();

const CartsController = require("../controllers/carts");
const cartValidation = require("../helpers/cartValidation");
// app.use(cors({ origin: '*', credentials: true }))

route.post("/create", cartValidation, CartsController.createCart);
route.get("/getAllCarts", CartsController.getAllCarts);
route.get("/getCart/:cartId", CartsController.getCartById);
route.patch("/editCart/:cartId", CartsController.editCart);
route.delete("/removeCart/:cartId", CartsController.removeCart);

module.exports = route;
