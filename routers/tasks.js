const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
	const { completed, sort } = req.query;
	let result = [...tasks];

	// If completed query param exists, filter tasks by completion status
	if (completed !== undefined) {
		// Convert string query param to boolean
		const isCompleted = completed === "true";
		result = result.filter(task => task.completed === isCompleted);
	}

	// Sort by creation date if sort=date query param exists
	if (sort === "date") {
		result.sort((a, b) => b.id - a.id); // Since id increments with creation, we can use it as creation date
	}

	res.json(result);
});

router.get("/priority/:level", (req, res) => {
	const validPriorities = ["low", "medium", "high"];
	const level = req.params.level.toLowerCase();

	if (!validPriorities.includes(level)) {
		return res.status(400).json({
			message: "Invalid priority level. Must be low, medium, or high",
		});
	}

	const result = tasks.filter(task => task.priority === level);
	res.json(result);
});

router.get("/:id", (req, res) => {
	const task = tasks.find(task => task.id === +req.params.id);
	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.json(task);
});

router.post("/", (req, res) => {
	const { title, description, completed, priority } = req.body;

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

	// Validate priority
	if (
		!priority ||
		!["low", "medium", "high"].includes(priority.toLowerCase())
	) {
		return res
			.status(400)
			.json({ message: "Priority must be low, medium, or high" });
	}

	const task = {
		id: tasks.length + 1,
		title: title.trim(),
		description: description.trim(),
		completed,
		priority: priority.toLowerCase(),
	};

	tasks.push(task);
	res.status(201).json(task);
});

router.put("/:id", (req, res) => {
	const task = tasks.find(task => task.id === +req.params.id);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	const { title, description, completed, priority } = req.body;

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

	// Validate priority
	if (
		!priority ||
		!["low", "medium", "high"].includes(priority.toLowerCase())
	) {
		return res
			.status(400)
			.json({ message: "Priority must be low, medium, or high" });
	}

	task.title = title.trim();
	task.description = description.trim();
	task.completed = completed;
	task.priority = priority.toLowerCase();

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
