import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('This is Current User');
});

export { router as currentUserRouter };
