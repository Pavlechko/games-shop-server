import express, { Application } from 'express';

import { db } from './models/models';

const app: Application = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

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
