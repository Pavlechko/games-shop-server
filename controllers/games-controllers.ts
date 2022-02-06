import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import path from 'path';
import fileUpload from 'express-fileupload';

import { Games } from '../models/models';
import ApiError from '../error/api-error';
import { where } from 'sequelize/dist';

const uuId = v4();

class GamesControllers {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, publisherId, genreId, description } = req.body;
      const img = req.files?.img as fileUpload.UploadedFile;
      let fileName = uuId + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const game = await Games.create({ name, price, publisherId, genreId, img: fileName, description });

      return res.json(game);
    } catch (error) {
      if (error instanceof Error) {
        next(ApiError.badRequest(error.message));
      }
    }

  };

  async getAll(req: Request, res: Response) {
    const { genreId, publisherId } = req.query;
    let page: number = +(req.query?.page!) || 1;
    let limit: number = +(req.query?.limit!) || 9;
    let games;
    let offset = page * limit - limit;

    if (!genreId && !publisherId) {
      games = await Games.findAndCountAll({ limit, offset });
    }
    if (genreId && !publisherId) {
      games = await Games.findAndCountAll({ where: { genreId }, limit, offset });
    }
    if (!genreId && publisherId) {
      games = await Games.findAndCountAll({ where: { publisherId }, limit, offset });
    }
    if (genreId && publisherId) {
      games = await Games.findAndCountAll({ where: { genreId, publisherId }, limit, offset });
    }
    return res.json(games);
  };

  async getOne(req: Request, res: Response) {
    const id: number = +(req.params?.id!);
    const game = await Games.findOne({ where: { id } });
    return res.json(game);
  }

  async delete() {

  }
}

type Quert = {
  genreId: number;
  publisherId: number;
  limit: number;
  page: number;
};

export default new GamesControllers();