import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import recipesRouter from './routes/recipesRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
