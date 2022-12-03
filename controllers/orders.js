const Orders = require("../models/orders");
const Users = require("../models/users");
const Products = require("../models/products");
const { errorFunction } = require("../utils/errorFunction");

const createOrder = async (req, res, next) => {
  try {
    const productId = await Products.findById(req.body.productId);
    const userId = await Users.findById(req.body.userId);
    if (!productId) {
      return res.json(
        errorFunction(true, 204, "This product Id have not in the database")
      );
    }
    if (!userId) {
      return res.json(
        errorFunction(true, 204, "This user Id have not in the database")
      );
    }
    const order = await Orders(req.body);
    order
      .save()
      .then(
        res.status(201).json(errorFunction(false, 201, "Order Created", order))
      );
  } catch (error) {
    console.log(error);
    res.status(201).json(errorFunction(true, 403, "Error Creating Order"));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { pageSize = 24, pageNumber = 1, productName = "" } = req.query;

    const filter = {
      $and: [
        {
          productName: {
            $regex: productName,
            $options: "$i",
          },
        },
      ],
    };

    const filterOrders = await Orders.find(filter)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allOrders = await Orders.find(filter);

    const data = {
      filterOrders,
      allOrders,
    };

    if (filterOrders.length > 0) {
      res.status(201).json(errorFunction(false, 201, "Successfuly", data));
    } else {
      res.status(201).json(errorFunction(false, 201, "No results", []));
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "No results", []));
  }
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findById(orderId);
    if (order) {
      res.status(200).json(errorFunction(false, 200, "Successfuly", order));
    } else {
      res
        .status(200)
        .json(
          errorFunction(false, 204, "Order does not exist in the database", [])
        );
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const editOrder = (req, res, next) => {
  try {
    let orderId = req.params.orderId;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(404)
        .json(errorFunction(false, 400, `Data to update can not be empty!`));
    }
    Orders.findByIdAndUpdate(orderId, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res
          .status(404)
          .json(
            errorFunction(
              false,
              404,
              `Cannot update Order with id=${orderId}. Maybe Order was not found!`
            )
          );
      } else {
        getOrderById(req, res, next);
      }
    });
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const removeOrder = (req, res) => {
  try {
    let orderId = req.params.orderId;
    Orders.findByIdAndRemove(orderId).then(() => {
      res
        .status(200)
        .json(errorFunction(false, 200, "Order Deleted Successfully!"));
    });
  } catch (error) {
    res
      .status(400)
      .json(errorFunction(true, 400, "Order Deleted Unsuccessfully!"));
  }
};

// get by user id
const getOrderByUserId = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const filter = {
      $and: [
        {
          userId: {
            $regex: userId,
            $options: '$i',
          },
        },
      ],
    }
    const orders = await Orders.find(filter)
    if (orders) {
      res.status(200).json({
        statusCode: 200,
        total: orders.length,
        orders: orders.reverse(),
      })
    } else {
      res.json({
        statusCode: 204,
        message: 'This order Id have not in the database',
        order: {},
      })
    }
  } catch (error) {
    res.status(400)
    return res.json(errorFunction(true, 400, 'Bad request'))
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  editOrder,
  removeOrder,
  getOrderByUserId
};
