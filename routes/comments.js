const express = require("express");
const route = express.Router();
const cors = require("cors");
const app = express();

const CommnetsController = require("../controllers/comments");
const commentValidation = require("../helpers/commentValidation");
// app.use(cors({ origin: '*', credentials: true }))

route.post("/create", commentValidation, CommnetsController.createComment);
route.get("/getComments", CommnetsController.getComments);
route.patch("/editComment/:commentId", CommnetsController.editComment);
route.delete("/removeComment/:commentId", CommnetsController.removeComment);


module.exports = route;
