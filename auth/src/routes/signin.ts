import { Router } from 'express';

const router = Router();

router.post('/api/users/signin', (req, res) => {
  res.send('This User is to signin');
});

export { router as signinRouter };
