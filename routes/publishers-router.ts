import Router from "express";
import publishersControllers from "../controllers/publishers-controllers";

export const router = Router();

router.post('/', publishersControllers.create);
router.get('/', publishersControllers.getAll);