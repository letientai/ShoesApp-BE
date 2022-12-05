const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoriesSchema = new Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productBrand: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quatity: {
      type: Number,
      require: true,
    },
    orderStatus: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Histories = mongoose.model("Histories", HistoriesSchema);
module.exports = Histories;
