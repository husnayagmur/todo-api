const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { registerValidation, loginValidation } = require("../validation/authValidation");
const validate = require("../middlewares/validateMiddleware");

// Kullanıcı kayıt olma (validation + kontrol)
router.post("/register", registerValidation, validate, authController.register);

// Kullanıcı giriş yapma (validation + kontrol)
router.post("/login", loginValidation, validate, authController.login);

module.exports = router;
