import Router from "express";

import publishersControllers from "../controllers/publishers-controllers";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

export const router = Router();

router.post('/', checkRoleMiddleware('Admin'), publishersControllers.create);
router.get('/', publishersControllers.getAll);