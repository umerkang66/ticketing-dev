import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Not found routes
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

const start = async () => {
  // Because mongodb is running in another kubernetes pod (created by auth-mongo-deployment) has the "auth-mongo-srv" name, we have to connect using that name
  const authMongoSrvName = 'auth-mongo-srv';
  const authMongoPort = 27017;
  const protocol = 'mongodb';
  const databaseName = 'auth';

  const url = `${protocol}://${authMongoSrvName}:${authMongoPort}/${databaseName}`;

  try {
    await mongoose.connect(url);
    console.log('Connected to mongodb database');
  } catch (err) {
    console.error(err);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
};

start();
