const fs = require('fs').promises; // Using fs.promises for async operations
const path = require('path');
const dataPath = path.join(__dirname, '../data/users.json');

const readJSONFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    console.log(data)
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return []; // Return an empty array if file read fails or is empty
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

const updateUser = async (id, updatedUser) => {
  const users = await readJSONFile();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    await writeJSONFile(users);
    return true; 
  }
  return false; 
};

const patchUser = async (id, updatedFields) => {
  const users = await readJSONFile();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedFields };
    await writeJSONFile(users);
    return true;
  }
  return false;
};

const deleteUser = async (id) => {
  const users = await readJSONFile();
  const filteredUsers = users.filter(user => user.id !== id);
  await writeJSONFile(filteredUsers);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  patchUser,
  deleteUser,
};
