import express, { Application } from 'express';

const app: Application = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
