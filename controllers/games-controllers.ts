import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import path from 'path';
import fileUpload from 'express-fileupload';

import { Games } from '../models/models';
import ApiError from '../error/api-error';

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

  async getAll() {

  };

  async getOne() {

  }

  async delete() {

  }
}

export default new GamesControllers();