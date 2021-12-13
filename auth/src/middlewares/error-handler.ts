import { NextFunction, Request, Response } from 'express';

// If any function has four arguments, express is going to recognize it as error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Something went wrong by umer', err);

  // Here we have to send an consistent form of errors
  res.status(400).send({
    message: 'Something went wrong by umer',
  });
};
