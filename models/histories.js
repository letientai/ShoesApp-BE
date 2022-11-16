const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
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
    quatily: {
      type: Number,
      require: true,
    },
    orderStatus: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    userld: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
