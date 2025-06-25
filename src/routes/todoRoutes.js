const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/todo", authMiddleware, todoController.todoAdd);


router.get("/todoList", authMiddleware, todoController.todoList);


router.put("/update/:id", authMiddleware, todoController.todoUpdate);


router.delete("/delete/:id", authMiddleware, todoController.todoDelete);


router.get("/detail/:id", authMiddleware, todoController.todoDetail);

module.exports = router;
