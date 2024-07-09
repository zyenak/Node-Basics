const { userModel } = require('../models');

const getUsers = async (req, res) => { // Make getUsers an async function
  try {
    const users = await userModel.getAllUsers(); // Await getAllUsers
    console.log("Users:", users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => { // Make getUserById an async function
  try {
    const user = await userModel.getUserById(req.params.id); // Await getUserById
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => { // Make createUser an async function
  try {
    const newUser = { id: Date.now().toString(), ...req.body };
    await userModel.addUser(newUser); // Await addUser
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = req.body;
    const success = await userModel.updateUser(req.params.id, updatedUser);
    if (success) {
      res.json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const patchUser = async (req, res) => {
  try {
    const updatedFields = req.body;
    const success = await userModel.patchUser(req.params.id, updatedFields);
    if (success) {
      res.json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error patching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => { // Make deleteUser an async function
  try {
    await userModel.deleteUser(req.params.id); // Await deleteUser
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
