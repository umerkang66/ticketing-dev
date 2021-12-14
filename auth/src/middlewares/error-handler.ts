import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

// If any function has four arguments, express is going to recognize it as error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('Handling this error as a request validation error');
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('Handling this error as a db connection error');
  }

  // Here we have to send an consistent form of errors
  res.status(400).send({
    message: err.message,
  });
};
