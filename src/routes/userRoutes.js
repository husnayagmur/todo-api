const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Kullanıcı kayıt olma
router.post("/register", authController.register);

// Kullanıcı giriş yapma
router.post("/login", authController.login);

module.exports = router;
