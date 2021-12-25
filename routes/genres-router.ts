import Router from "express";
import genresControllers from "../controllers/genres-controllers";

export const router = Router();


router.post('/', genresControllers.create);

router.get('/', genresControllers.getAll);