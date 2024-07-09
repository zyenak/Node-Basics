require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const { bodyParser, requestLogger } = require('./middlewares');

// Middleware
app.use(requestLogger);
app.use(bodyParser);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API!');
});

// Routes
app.use('/api', routes);

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
