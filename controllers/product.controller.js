const { MISSING_FIELD_MESSAGE } = require("../constants/constant");
const Product = require("../models/product.model");
const { validateRequestBody } = require("../utils/functions");
const { sendResponse, sendInternalErrorReponse } = require("../utils/response");

exports.create = async (req, res) => {
    const missingFields = validateRequestBody(req, [
      "name",
      "description",
      "price",
      "category",
    ]);

    if (missingFields.length > 0) {
      return sendResponse(res, 400, MISSING_FIELD_MESSAGE, missingFields);
    }
    const image=req.file;
    const product = await Product.create({...req.body,thumbnail:image.path});
    return sendResponse(res, 201, "Product created successfully!", product);
};

exports.all = async (req, res) => {
    const condition = req.query;
    const products = await Product.find(condition);
    return sendResponse(res, 200, "Products fetched successfully!", products);
};

exports.get = async (req, res) => {
    const condition = req.query;
    const product = await Product.findOne(condition);
    return sendResponse(res, 200, "Product fetched successfully!", product);
};

exports.delete = async (req, res) => {
    const condition = req.query;
    const product = await Product.findOneAndDelete(condition);
    if(!product)return sendResponse(res,404,"Product Not Found");
    return sendResponse(res, 200, "Product deleted successfully!", product);
};

exports.update = async (req, res) => {
    const condition = req.query;
    const product = await Product.findOneAndUpdate(condition, req.body, {
      new: true,
      runValidators: true,
    });
    return sendResponse(res, 200, "Product fetched successfully!", product);
};

