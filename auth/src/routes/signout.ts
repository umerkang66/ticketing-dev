import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (req, res) => {
  res.send('This is Current User');
});

export { router as signoutRouter };
