const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
	res.json(tasks);
});

router.get("/:id", (req, res) => {
	const task = tasks.find(task => task.id === +req.params.id);
	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.json(task);
});

router.post("/", (req, res) => {
	const { title, description, completed } = req.body;

	// Validate required fields
	if (!title || !description) {
		return res
			.status(400)
			.json({ message: "Title and description are required" });
	}

	// Validate title and description are not empty strings
	if (title.trim() === "" || description.trim() === "") {
		return res
			.status(400)
			.json({ message: "Title and description cannot be empty" });
	}

	// Validate completed is boolean
	if (typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ message: "Completed must be a boolean value" });
	}

	const task = {
		id: tasks.length + 1,
		title: title.trim(),
		description: description.trim(),
		completed,
	};

	tasks.push(task);
	res.status(201).json(task);
});

router.put("/:id", (req, res) => {
	const task = tasks.find(task => task.id === +req.params.id);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	const { title, description, completed } = req.body;

	// Validate required fields
	if (!title || !description) {
		return res
			.status(400)
			.json({ message: "Title and description are required" });
	}

	// Validate title and description are not empty strings
	if (title.trim() === "" || description.trim() === "") {
		return res
			.status(400)
			.json({ message: "Title and description cannot be empty" });
	}

	// Validate completed is boolean
	if (typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ message: "Completed must be a boolean value" });
	}

	task.title = title.trim();
	task.description = description.trim();
	task.completed = completed;

	res.json(task);
});

router.delete("/:id", (req, res) => {
	const taskExists = tasks.some(task => task.id === +req.params.id);

	if (!taskExists) {
		return res.status(404).json({ message: "Task not found" });
	}

	const _tasks = tasks.filter(task => task.id !== +req.params.id);
	tasks = _tasks;

	res.json({ message: "Task deleted", id: req.params.id });
});

module.exports = router;
