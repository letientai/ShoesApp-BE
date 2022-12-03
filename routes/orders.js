const express = require("express");
const route = express.Router();
const cors = require("cors");
const app = express();

const OrdersController = require("../controllers/orders");
const orderValidation = require("../helpers/orderValidation");
// app.use(cors({ origin: '*', credentials: true }))

route.post("/create", orderValidation, OrdersController.createOrder);
route.get("/getAllOrders", OrdersController.getAllOrders);
route.get("/getOrder/:orderId", OrdersController.getOrderById);
route.patch("/editOrder/:orderId", OrdersController.editOrder);
route.delete("/removeOrder/:orderId", OrdersController.removeOrder);
route.delete("/getOrdersByUserId/:userId", OrdersController.getOrderByUserId);

module.exports = route;
