const { taskModel } = require('../models');

const getTasks = async (req, res) => {
  const { status, priority } = req.query;
  const tasks = await taskModel.getAllTasks();
  const filteredTasks = tasks.filter(task => {
    return (!status || task.status === status) && (!priority || task.priority === priority);
  });
  res.json(filteredTasks);
};

const getTaskById = async (req, res) => {
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const createTask = async (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  await taskModel.addTask(newTask);
  res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const updatedTask = req.body;
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.updateTask(req.params.id, updatedTask);
    res.json({ message: 'Task updated' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req, res) => {
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const patchTask = async (req, res) => {
  const updatedFields = req.body;
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.updateTask(req.params.id, updatedFields);
    res.json({ message: 'Task updated' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  patchTask,
};
