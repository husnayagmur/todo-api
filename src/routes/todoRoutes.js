const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validationResult } = require("express-validator");
const { todoAddValidation, todoUpdateValidation } = require("../validation/todoValidaton");
const validate = require("../middlewares/validateMiddleware");

router.post("/todo", authMiddleware,todoAddValidation,validate, todoController.todoAdd);


router.get("/todoList", authMiddleware, todoController.todoList);


router.put("/update/:id", authMiddleware,todoUpdateValidation,validate, todoController.todoUpdate);


router.delete("/delete/:id", authMiddleware, todoController.todoDelete);


router.get("/detail/:id", authMiddleware, todoController.todoDetail);

module.exports = router;
