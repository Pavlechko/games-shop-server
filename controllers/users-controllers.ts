import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/api-error';

class UserControllers {
  async registration() {

  };

  async login() {

  };

  async check(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('No set id!'));
    }
    res.json(id);
  };

  async delete() {

  };
}

export default new UserControllers();