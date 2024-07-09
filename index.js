require('dotenv').config();
const express = require('express');
const app = express();
const { userRoutes, productRoutes } = require('./routes');
const { bodyParser, requestLogger } = require('./middleware');;

// Middleware
app.use(requestLogger);
app.use(bodyParser);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome, Users!');
});

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
