import Router from "express";
import gamesControllers from "../controllers/games-controllers";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

export const router = Router();

router.post('/', checkRoleMiddleware('Admin'), gamesControllers.create);
router.get('/', gamesControllers.getAll);
router.get('/:id', gamesControllers.getOne);
router.delete('/:id', checkRoleMiddleware('Admin'), gamesControllers.delete);