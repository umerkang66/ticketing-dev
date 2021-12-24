import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (req, res) => {
  res.send('This User is to signout');
});

export { router as signoutRouter };
