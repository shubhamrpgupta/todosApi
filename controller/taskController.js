const Task = require("../model/Task");
const User = require("../model/User");



exports.createTask = async (req, res) => {
    try {
        const { userId } = req.params;
        const { description, completionStatus, dueDate } = req.body;
        if (!description || !completionStatus || !dueDate) {
            res.json({ status: 400, message: "Please Give the required information" })
        }
        await Task.create({ description: description, completionStatus: completionStatus, dueDate: dueDate, user_id: userId })
            .then((result) => {
                res.json({ status: 200, newTask: result })
            })
            .catch((err) => {
                res.json({ status: 400, message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}


exports.findAllTask = async (req, res) => {
    try {
        const { userId } = req.params;
        await Task.findAll({ where: { user_id: userId } })
            .then((result) => {
                if (!result) {
                    res.json({ status: 200, message: "No Tasks found for the current user" })
                } else {
                    res.json({ status: 200, allTasks: result })
                }
            })
            .catch((err) => {
                res.json({ status: 400, message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }

}


exports.findSingleTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        await Task.findOne({ where: { id: taskId, user_id: userId } })
            .then((result) => {
                if (!result) {
                    res.json({ status: 200, message: `No task found with the task id : ${taskId}` })
                } else {
                    res.json({ status: 200, singleTask: result })
                }
            })
            .catch((err) => {
                res.json({ message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}


exports.editTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        await Task.update(req.body, { where: { id: taskId, user_id: userId } })
            .then((result) => {
                res.json({ status: 200, updatedTask: result })
            })
            .catch((err) => {
                res.json({ message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}


exports.deleteTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        await Task.destroy({ where: { id: taskId, user_id: userId } })
            .then((result) => {
                res.json({ status: 200, deletedTask: result })
            })
            .catch((err) => {
                res.json({ message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}