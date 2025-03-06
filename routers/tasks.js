const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
	res.json(tasks);
});

router.get("/:id", (req, res) => {
	const task = tasks.filter(task => task.id === +req.params.id);
	res.json(task);
});

router.post("/", (req, res) => {
	const task = {
		id: tasks.length + 1,
		title: req.body.title,
		description: req.body.description,
		completed: req.body.completed,
	};
	tasks.push(task);
	res.json(task);
});

router.put("/:id", (req, res) => {
	const task = tasks.find(task => task.id === +req.params.id);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}
	task.title = req.body.title;
	task.description = req.body.description;
	task.completed = req.body.completed;
	res.json(task);
});

router.delete("/:id", (req, res) => {
	const _tasks = tasks.filter(task => task.id !== +req.params.id);

	tasks = _tasks;

	res.json({ message: "Task deleted", id: req.params.id });
});

module.exports = router;
