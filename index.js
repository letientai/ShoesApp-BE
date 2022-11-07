const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ProductsRoute = require("./routes/products");
const UsersRoute = require("./routes/users");
const cors = require("cors");
const { allowCrossDomain } = require("./utils/corsMiddleware");

const connection_string =
  "mongodb+srv://admin:201111@cluster0.uhlkj5n.mongodb.net/test";

mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT || 3000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

database.on("error", (error) => {
  console.log(error);
});

app.use(allowCrossDomain);

database.once("connected", () => {
  console.log("Database Connected");
});
app.use("/api/products", ProductsRoute);
app.use("/api/users", UsersRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
