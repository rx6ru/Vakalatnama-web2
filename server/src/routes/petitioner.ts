//this is ts file so add types

import { Router, Request, Response, NextFunction } from 'express';
import authCheck from '../middleware/petAuth';

const router = Router();

// Protect all following routes
router.use('/', authCheck, (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.user) {
    res.redirect('/petitioner/dashboard');
  }else {
    res.redirect('/petitioner/signin');
  }
});

router.post('/signin', (req: Request, res: Response) => {
  // sign‑in logic here
});

// Protected routes
router.get('/dashboard', (req: Request, res: Response) => {
  // fetch and return user data
});

router.get('/dashboard/edit', (req: Request, res: Response) => {
  // render edit form
});

router.post('/dashboard/edit', (req: Request, res: Response) => {
  // handle edits
});

export default router;
