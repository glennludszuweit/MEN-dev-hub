const express = require("express");
const httpStatus = require("http-status-codes");

const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARE

//ROUTE REGISTER
app.get("/", (req, res) => {
  res.send(`<h1>Welcome!</h1>`);
});

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
