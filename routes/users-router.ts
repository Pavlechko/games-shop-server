import Router from "express";

import usersControllers from "../controllers/users-controllers";
import authMiddleware from "../middleware/authMiddleware";

const usersRouter = Router();

usersRouter.post('/registration', usersControllers.registration);
usersRouter.post('/login', usersControllers.login);
usersRouter.get('/auth', authMiddleware, usersControllers.check);
usersRouter.delete('/:id', usersControllers.delete);
usersRouter.get('/', usersControllers.getAll);

export default usersRouter;
