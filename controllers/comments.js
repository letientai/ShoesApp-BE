const Comments = require("../models/comments");
const { errorFunction } = require("../utils/errorFunction");

const createComment = async (req, res, next) => {
  try {
    const comment = await Comments(req.body);
    comment
      .save()
      .then(
        res
          .status(201)
          .json(errorFunction(false, 201, "Comment Created", comment))
      );
  } catch (error) {
    res.status(201).json(errorFunction(true, 403, "Error Creating Comment"));
  }
};


const getComments = async (req, res, next) => {
  try {
    const { productId = "" } = req.query;

    const filter = {
      $and: [
        {
          productId: {
            $regex: productId,
            $options: "$i",
          },
        },
      ],
    };

    const filterComments = await Comments.find(filter)

    if (filterComments.length > 0) {
      res.status(201).json(errorFunction(false, 201, "Successfuly", filterComments));
    } else {
      res.status(201).json(errorFunction(false, 201, "No results", []));
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Error Getting Comment"));
  }
};
const editComment = (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(404)
        .json(errorFunction(false, 400, `Data to update can not be empty!`));
    }
    Comments.findByIdAndUpdate(commentId, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res
          .status(404)
          .json(
            errorFunction(
              false,
              404,
              `Cannot update Comment with id=${commentId}. Maybe Cart was not found!`
            )
          );
      } else {
        res
          .status(201)
          .json(
            errorFunction(
              false,
              201,
              "Update Successfuly!"
            )
          );
      }
    });
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const removeComment = (req, res) => {
  try {
    let commentId = req.params.commentId;
    Comments.findByIdAndRemove(commentId).then(() => {
      res
        .status(200)
        .json(errorFunction(false, 200, "Comment Deleted Successfully!"));
    });
  } catch (error) {
    res
      .status(400)
      .json(errorFunction(true, 400, "Comment Deleted Unsuccessfully!"));
  }
};

module.exports = {
  createComment,
  getComments,
  editComment,
  removeComment
};
