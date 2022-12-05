const express = require("express");
const route = express.Router();
const cors = require("cors");
const app = express();

const HistoriesController = require("../controllers/histories");
const historyValidation = require("../helpers/historyValidation");

route.post("/create", historyValidation, HistoriesController.createHistory);
route.get("/getHistoriesByUserId/:userId", HistoriesController.getHistoriesByUserId);


module.exports = route;
