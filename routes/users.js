const express = require("express");
const route = express.Router();
const UserController = require("../controllers/users");
const userValidation = require("../helpers/userValidation");

route.post("/register", userValidation, UserController.register);
route.get("/getAllUsers", UserController.getAllUsers);
route.get("/getUserById/:userId", UserController.getUserById);
route.delete("/removeUser/:userId", UserController.removeUser);
route.patch("/editUser/:userId", UserController.editInfo);
route.post("/login", UserController.login);

module.exports = route;
