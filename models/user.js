const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../data/users.json');

const readJSONFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return [];
  }
};

const writeJSONFile = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing users.json:', error);
  }
};

const getAllUsers = async () => {
  return await readJSONFile();
};

const getUserById = async (id) => {
  const users = await readJSONFile();
  return users.find(user => user.id === id);
};

const addUser = async (user) => {
  const users = await readJSONFile();
  users.push(user);
  await writeJSONFile(users);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
