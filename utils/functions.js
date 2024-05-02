exports.validateRequestBody = (req, requiredFields) => {
    const missingFields = [];
    requiredFields.forEach((key) => {
      if (!(key in req.body)) {
        missingFields.push(key);
      }
    });
    return missingFields;
  };
  