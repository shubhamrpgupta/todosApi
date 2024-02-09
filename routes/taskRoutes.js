const express = require("express");
const { createTask, findAllTask, findSingleTask, editTask, deleteTask } = require("../controller/taskController");
const router = express.Router();

router.get("/:userId/alltasks", findAllTask);
router.post("/:userId/create", createTask);
router.get("/:userId/task/:taskId", findSingleTask);
router.put("/:userId/task/edit/:taskId", editTask);
router.delete("/:userId/task/delete/:taskId", deleteTask);

module.exports = router