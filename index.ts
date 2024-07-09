import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import routes from './routes';
import { bodyParser, requestLogger } from './middlewares';

const app = express();

// Middleware
app.use(requestLogger);
app.use(bodyParser);

// Basic route
app.get('/', (req: Request, res: Response) => {
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
