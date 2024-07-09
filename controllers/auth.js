const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models');

const register = async (req, res) => {
  const { username, password } = req.body;
  const users = await userModel.getAllUsers();
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), username, password: hashedPassword };
  await userModel.addUser(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const users = await userModel.getAllUsers();
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
};

module.exports = {
  register,
  login,
};
