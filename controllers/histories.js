const Histories = require("../models/histories");
const { errorFunction } = require("../utils/errorFunction");
const createHistory = async (req, res, next) => {
  try {
    const history = await Histories(req.body);
    history
      .save()
      .then(
        res
          .status(201)
          .json(errorFunction(false, 201, "History Created", history))
      );
  } catch (error) {
    res.status(201).json(errorFunction(true, 403, "Error Creating History"));
  }
};

const getHistoriesByUserId = async (req, res, next) => {
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
    const histories = await Histories.find(filter)
    if (histories) {
      const data = {
        total: histories.length,
        histories: histories.reverse(),
      }
      res
        .status(201)
        .json(errorFunction(false, 201, "Successfuly", data))

    } else {
      res
        .status(201)
        .json(errorFunction(false, 204, "This order Id have not in the database", {}))
    }
  } catch (error) {
    res.status(400)
    return res.json(errorFunction(true, 400, 'Bad request'))
  }
}


module.exports = {
  createHistory,
  getHistoriesByUserId
};
