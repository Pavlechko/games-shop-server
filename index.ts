import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import router from './routes/index';
import { db } from './models/models';
import errorHandler from './middleware/error-handling-middelware';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
