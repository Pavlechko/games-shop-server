import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { Users, Baskets } from '../models/models';
import ApiError from '../error/api-error';

dotenv.config();

const generateToken = (id: number, email: string, role: string) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY!,
    { expiresIn: '24h' }
  );
}

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Your password or email address is incorrect'));
    }

    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('A user with this email already exists'));
    }

    const hashPassword = await bcrypt.hash(password, 4);
    const user = await Users.create({ email, role, password: hashPassword });
    console.log(user.id);
    const basket = await Baskets.create({ userId: user.id });
    const token = generateToken(user.id, user.email, user.role);

    return res.json(token);
  };

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest('User with this email not found!'));
    }

    const comparePasword = await bcrypt.compare(password, user.password);
    console.log(comparePasword);

    if (!comparePasword) {
      return next(ApiError.badRequest(`Password isn't correct!`));
    }

    const token = generateToken(user.id, user.email, user.role);

    return res.json(token);
  };

  async check(req: Request, res: Response, next: NextFunction) {
    const token = generateToken(req.user!.id, req.user!.email, req.user!.role);
    return res.json(token);
  };

  async delete() {

  };

  async getAll(req: Request, res: Response) {
    const baskets = await Baskets.findAll();

    return res.json(baskets);
  }
}

export default new UserControllers();