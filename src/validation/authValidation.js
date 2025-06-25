const { body } = require("express-validator");

const registerValidation = [
  body("username")
    .notEmpty().withMessage("Kullanıcı adı zorunludur.")
    .isString().withMessage("Kullanıcı adı metin olmalıdır.")
    .trim()
    .isLength({ min: 3 }).withMessage("Kullanıcı adı en az 3 karakter olmalıdır."),

  body("email")
    .notEmpty().withMessage("E-posta zorunludur.")
    .isEmail().withMessage("Geçerli bir e-posta adresi giriniz.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Şifre zorunludur.")
    .isLength({ min: 7 }).withMessage("Şifre en az 7 karakter olmalıdır.")
];

const loginValidation = [
  body("email")
    .notEmpty().withMessage("E-posta zorunludur.")
    .isEmail().withMessage("Geçerli bir e-posta adresi giriniz.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Şifre zorunludur.")
];

module.exports = {
  registerValidation,
  loginValidation
};
