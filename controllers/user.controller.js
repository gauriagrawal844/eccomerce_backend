const { MISSING_FIELD_MESSAGE } = require("../constants/constant");
const User = require("../models/user.model");
const { validateRequestBody } = require("../utils/functions");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendResponse, sendInternalErrorReponse } = require("../utils/response");

exports.create = async (req, res) => {
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
};

exports.all = async (req, res) => {
    const condition = req.query;
    const users = await User.find(condition);
    return sendResponse(res, 200, "Users fetched successfully!", users);
};

exports.get = async (req, res) => {
    const condition = req.query;
    const user = await User.findOne(condition);
    return sendResponse(res, 200, "User fetched successfully!", user);
};

exports.update = async (req, res) => {
    const condition = req.query;
    const user = await User.findOneAndUpdate(condition, req.body, {
      new: true,
      runValidators: true,
    });
    return sendResponse(res, 200, "User fetched successfully!", user);
};

exports.delete = async (req, res) => {
    const condition = req.query;
    const user = await User.findOneAndDelete(condition);
    return sendResponse(res, 200, "User deleted successfully!", user);
};
exports.signup = async (req, res) => {
  const missingFields = validateRequestBody(req, [
    "name",
    "password",
    "email",
    "phoneNo",
  ]);

  if (missingFields.length > 0) {
    return sendResponse(res, 400, MISSING_FIELD_MESSAGE, missingFields);
  }
  const password=req.body.password;
  const hashPassword=await bcrypt.hash(password,+process.env.SALT_ROUND);
  const user = await User.create({...req.body,password:hashPassword});
  const token=jwt.sign({
    _id:user._id,
  },
  process.env.JWT_SECRET_KEY,
  {
    expiresIn:process.env.JWT_EXPIRY,
  }
);
delete user._doc.password;
return sendResponse(res,201,'User logged in successfully!',{
  ...user._doc,
  token,
});
};

exports.login = async (req, res) => {
  const missingFields = validateRequestBody(req, ['password', 'email']);
  if (missingFields.length > 0) {
    return sendResponse(res, 400, MISSING_FIELD_MESSAGE, missingFields);
  }
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  }).select('+password -__v');
  if (!user) {
    return sendResponse(res, 404, 'User not found');
  }
  console.log(user);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return sendResponse(res, 404, 'Invalid credentials');
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
  delete user._doc.password;
  return sendResponse(res, 201, 'User logged in successfully!', {
    ...user._doc,
    token,
  });
};
