import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

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
      // Handle error
      throw new Error('Invalid email or password');
    }

    console.log('Creating new user');

    throw new Error('Error connecting to database');

    res.send({});
  }
);

export { router as signupRouter };
