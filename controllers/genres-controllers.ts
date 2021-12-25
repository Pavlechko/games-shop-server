import { Request, Response } from 'express';

import { Genres } from '../models/models';
import ApiError from '../error/api-error';

class GenresControllers {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const genre = await Genres.create({ name });
    return res.json(genre);
  };

  async getAll(req: Request, res: Response) {
    const genres = await Genres.findAll();
    return res.json(genres);
  };
}

export default new GenresControllers();