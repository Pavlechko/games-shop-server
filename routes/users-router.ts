import Router from "express";

import usersControllers from "../controllers/users-controllers";

const usersRouter = Router();

usersRouter.post('/registration', usersControllers.registration);
usersRouter.post('/login', usersControllers.login);
usersRouter.get('/auth', usersControllers.check);
usersRouter.delete('/:id', usersControllers.delete);

export default usersRouter;
