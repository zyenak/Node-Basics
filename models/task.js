const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../data/task.json');

const readJSONFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks.json:', error);
    return [];
  }
};

const writeJSONFile = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing tasks.json:', error);
  }
};

const getAllTasks = async () => {
  return await readJSONFile();
};

const getTaskById = async (id) => {
  const tasks = await readJSONFile();
  return tasks.find(task => task.id === id);
};

const addTask = async (task) => {
  const tasks = await readJSONFile();
  tasks.push(task);
  await writeJSONFile(tasks);
};

const updateTask = async (id, updatedTask) => {
  const tasks = await readJSONFile();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await writeJSONFile(tasks);
  }
};

const deleteTask = async (id) => {
  const tasks = await readJSONFile();
  const filteredTasks = tasks.filter(task => task.id !== id);
  await writeJSONFile(filteredTasks);
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
