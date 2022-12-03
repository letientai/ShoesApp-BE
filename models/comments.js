const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
