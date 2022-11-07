const Users = require("../models/users");
const UsersSchema = require("../helpers/validation");
const { errorFunction } = require("../utils/errorFunction");
const securePassword = require("../utils/securePassword");
// Create product
const register = async (req, res, next) => {
  try {
    const existingEmail = await Users.findOne({
      email: req.body.email,
    });
    const existingUsername = await Users.findOne({
      username: req.body.username,
    }).lean(true);

    if (existingEmail || existingUsername) {
      res.status(403);
      return res.json(errorFunction(true, 403, "User Already Exists"));
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await Users.create({
        username: req.body.username,
        password: hashedPassword,
        fistName: req.body.fistName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        avatar: req.body.avatar,
        role: req.body.role,
      });
      if (newUser) {
        return res
          .status(201)
          .json(errorFunction(false, "User Created", newUser));
      } else {
        return res
          .status(403)
          .json(errorFunction(true, 403, "Error Creating User"));
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad request.",
      error,
      statusCode: 400,
    });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    if (allUsers.length > 0) {
      res.status(200).json({
        allUsers: allUsers.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        allUsers: [],
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        user,
      });
    } else {
      res.status(204).json({
        statusCode: 204,
        message: "Product does not exist in the database",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editInfo = (req, res, next) => {
  try {
    let userId = req.params.userId;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    Users.findByIdAndUpdate(userId, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${userId}. Maybe Product was not found!`,
        });
      } else {
        getUserById(req, res, next);
        // res.send({ message: "Updated product successfully." });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const removeUser = (req, res) => {
  try {
    let id = req.params.userId;
    Users.findByIdAndRemove(id).then(() => {
      res.json({
        message: "User Deleted Successfully!",
      });
    });
  } catch (error) {
    res.json({
      message: "User Deleted Unsuccessfully!",
    });
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserById,
  removeUser,
  editInfo,
};
