import { NextFunction, Request, Response } from 'express';

import ApiError from "../error/api-error";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'An unforeseen error' });
}