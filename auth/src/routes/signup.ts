import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = Router();

router.post(
  '/api/users/signup',
  [
    // Body is going to check the body of the incoming request
    body('email')
      .isEmail()
      .withMessage(
        'Email that is provided must be valid according the email standards'
      ),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters '),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log('Creating new user');

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
