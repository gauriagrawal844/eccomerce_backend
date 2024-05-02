const { MISSING_FIELD_MESSAGE } = require("../constants/constant");
const User = require("../models/user.model");
const { validateRequestBody } = require("../utils/functions");
const { sendResponse, sendInternalErrorReponse } = require("../utils/response");

exports.create = async (req, res) => {
  try {
    const missingFields = validateRequestBody(req, [
      "name",
      "password",
      "email",
      "phoneNo",
    ]);

    if (missingFields.length > 0) {
      return sendResponse(res, 400, MISSING_FIELD_MESSAGE, missingFields);
    }

    const user = await User.create(req.body);
    return sendResponse(res, 201, "User created successfully!", user);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.all = async (req, res) => {
  try {
    const condition = req.query;
    const users = await User.find(condition);
    return sendResponse(res, 200, "Users fetched successfully!", users);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.get = async (req, res) => {
  try {
    const condition = req.query;
    const user = await User.findOne(condition);
    return sendResponse(res, 200, "User fetched successfully!", user);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const condition = req.query;
    const user = await User.findOneAndUpdate(condition, req.body, {
      new: true,
      runValidators: true,
    });
    return sendResponse(res, 200, "User fetched successfully!", user);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const condition = req.query;
    const user = await User.findOneAndDelete(condition);
    return sendResponse(res, 200, "User deleted successfully!", user);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};
