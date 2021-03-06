import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@ticketing-umer/common';
import { User } from '../models/user';

const router = express.Router();

const validator = [
  body('email')
    .isEmail()
    .withMessage('The email that you have provided must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

router.post(
  '/api/users/signup',
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // this will automatically be caught by global express error-handling middleware
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT: first is payload then secret
    // this id is generated by mongoose, not mongodb
    const secret = process.env.JWT_KEY!;
    const userJwt = jwt.sign({ id: user.id, email: user.email }, secret);

    // Store it on the session obj, provided by cookie-session library, there might be no req.session, if we haven't created it anywhere first time
    // session obj will convert into json, then base 64 encoded, when we will decode it in UTF-8, this will be a json obj that will contain jwt:userJwt
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
