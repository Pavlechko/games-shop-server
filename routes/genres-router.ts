import Router from "express";

import genresControllers from "../controllers/genres-controllers";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

export const router = Router();


router.post('/', checkRoleMiddleware('Admin'), genresControllers.create);

router.get('/', genresControllers.getAll);