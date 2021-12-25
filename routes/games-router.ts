import Router from "express";
import gamesControllers from "../controllers/games-controllers";

export const router = Router();

router.post('/', gamesControllers.create);
router.get('/', gamesControllers.getAll);
router.get('/:id', gamesControllers.getOne);
router.delete('/:id', gamesControllers.delete);