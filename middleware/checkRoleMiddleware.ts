import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserAttributes } from '../types/userType';

dotenv.config();

declare module 'express' {
  interface Request {
    user?: UserAttributes
  }
}

export default (role: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No auth!' });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as UserAttributes;
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access denied!' });
      }
      req.user = decoded;
      next()
    } catch (error) {
      res.status(401).json({ message: 'No auth!' });
    }
  }
}