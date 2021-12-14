import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

// If any function has four arguments, express is going to recognize it as error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // We have to explicitly return it
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
