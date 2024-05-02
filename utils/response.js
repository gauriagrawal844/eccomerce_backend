const { ERROR_MSG, INTERNAL_STATUS_CODE } = require("../constants/constant");

exports.sendResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

exports.sendInternalErrorReponse = (res, error) => {
  return res.status(INTERNAL_STATUS_CODE).json({
    message: ERROR_MSG,
    error: error.message,
  });
};
