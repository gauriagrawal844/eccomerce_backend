const { MISSING_FIELD_MESSAGE } = require("../constants/constant");
const Product = require("../models/product.model");
const { validateRequestBody } = require("../utils/functions");
const { sendResponse, sendInternalErrorReponse } = require("../utils/response");

exports.create = async (req, res) => {
  try {
    const missingFields = validateRequestBody(req, [
      "name",
      "description",
      "price",
      "category",
    ]);

    if (missingFields.length > 0) {
      return sendResponse(res, 400, MISSING_FIELD_MESSAGE, missingFields);
    }

    const product = await Product.create(req.body);
    return sendResponse(res, 201, "Product created successfully!", product);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.all = async (req, res) => {
  try {
    const condition = req.query;
    const products = await Product.find(condition);
    return sendResponse(res, 200, "Products fetched successfully!", products);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.get = async (req, res) => {
  try {
    const condition = req.query;
    const product = await Product.findOne(condition);
    return sendResponse(res, 200, "Product fetched successfully!", product);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const condition = req.query;
    const product = await Product.findOneAndDelete(condition);
    return sendResponse(res, 200, "Product deleted successfully!", product);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};
exports.update = async (req, res) => {
  try {
    const condition = req.query;
    const product = await Product.findOneAndUpdate(condition, req.body, {
      new: true,
      runValidators: true,
    });
    return sendResponse(res, 200, "Product fetched successfully!", product);
  } catch (error) {
    return sendInternalErrorReponse(res, error);
  }
};

