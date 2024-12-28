const express = require("express");
const app = express();
const port = 5000;
const users = require("./MOCK_DATA.json");

//routes

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
