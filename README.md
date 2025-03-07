# Task Manager API

A RESTful API for managing tasks with priority levels and completion status. Built with Node.js and Express.

## Overview

This Task Manager API allows you to:

- Create, read, update and delete tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Filter tasks by priority level (low, medium, high)
- Track task title, description, completion status, and priority

## Setup Instructions

1. Ensure you have Node.js version 18 or higher installed
2. Clone this repository
3. Install dependencies:

## API Endpoints

### Tasks

- `GET /tasks` - Get all tasks

  - Query parameters:
    - `completed`: Filter by completion status (true/false)
    - `sort=date`: Sort by creation date

- `GET /tasks/:id` - Get a specific task by ID

- `GET /tasks/priority/:level` - Get tasks by priority level (low/medium/high)

- `POST /tasks` - Create a new task

  - Required fields in request body:
    - title (string)
    - description (string)
    - completed (boolean)
    - priority (low/medium/high)

- `PUT /tasks/:id` - Update an existing task

  - Required fields in request body:
    - title (string)
    - description (string)
    - completed (boolean)
    - priority (low/medium/high)

- `DELETE /tasks/:id` - Delete a task
