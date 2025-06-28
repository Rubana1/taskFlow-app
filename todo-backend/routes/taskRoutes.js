const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ✅ Create a new task
router.post('/create', async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    // Basic validation
    if (!title || !dueDate || !status) {
      return res.status(400).json({ error: 'Title, Due Date, and Status are required.' });
    }

    const task = await Task.create({ title, description, dueDate, status, priority });
    res.status(201).json(task);
  } catch (error) {
    console.error('❌ Failed to create task:', error);
    res.status(500).json({ error: 'Failed to create task', message: error.message });
  }
});

// ✅ Get all tasks (latest first)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    console.error('❌ Failed to fetch tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ✅ Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    console.error('❌ Failed to update task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ✅ Mark task complete/in-progress (update only status)
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error('❌ Failed to update task status:', err);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

// ✅ Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: '🗑️ Task deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
