import { Request, Response } from 'express';

import { Publishers } from '../models/models';
import ApiError from '../error/api-error';

class PublishersControllers {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const publisher = await Publishers.create({ name });
    return res.json(publisher);
  };

  async getAll(req: Request, res: Response) {
    const publishers = await Publishers.findAll();
    return res.json(publishers);
  };
}

export default new PublishersControllers();