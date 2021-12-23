const express = require("express");
const app = express();
const PORT = 3001;
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
