const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Hata mesajlarını tek bir string haline getirelim
    const extractedErrors = errors.array().map(err => `${err.param}: ${err.msg}`);

    return res.status(400).json({
      success: false,
      errors: extractedErrors
    });
  }
  next();
};

module.exports = validate;
