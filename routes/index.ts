import Router from 'express';
import { router as gamesRouter } from './games-router';
import usersRouter from './users-router';
import { router as genresRouter } from './genres-router';
import { router as publishersRouter } from './publishers-router';

const router = Router();

// router.get('/users', (req, res) => { res.json({ message: 'User in index.ts' }) });

router.use('/users', usersRouter);
router.use('/games', gamesRouter);
router.use('/genres', genresRouter);
router.use('/publishers', publishersRouter);

export default router;