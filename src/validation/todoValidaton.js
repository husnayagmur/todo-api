const { body } = require("express-validator")

const todoAddValidation = [
    body("name")
        .notEmpty().withMessage("Todo ismi zorunludur")
        .isString().withMessage("Todo ismi metin olmalıdır")
        .trim()
        .isLength({ min: 3 }).withMessage("Todo ismi en az 3 karakter olmalıdır"),

    body("description")
        .notEmpty().withMessage("Açıklama zorunludur.")
        .isString().withMessage("Açıklama metin olmalıdır.")
        .trim()
        .isLength({ min: 5 }).withMessage("Açıklama en az 5 karakter olmalıdır."),

    body("completed")
        .optional()
        .isBoolean().withMessage("Tamamlandı alanı true veya false olmalıdır.")
];

const todoUpdateValidation = [
  body("name")
    .optional()
    .isString().withMessage("Todo ismi metin olmalıdır.")
    .trim()
    .isLength({ min: 3 }).withMessage("Todo ismi en az 3 karakter olmalıdır."),

  body("description")
    .optional()
    .isString().withMessage("Açıklama metin olmalıdır.")
    .trim()
    .isLength({ min: 5 }).withMessage("Açıklama en az 5 karakter olmalıdır."),

  body("completed")
    .optional()
    .isBoolean().withMessage("Tamamlandı alanı true veya false olmalıdır.")
];

module.exports = {
  todoAddValidation,
  todoUpdateValidation
};
