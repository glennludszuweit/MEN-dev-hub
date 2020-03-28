const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//MIDDLEWARE
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

//ROUTE REGISTER
app.get("/", (req, res) => {
  res.render("index");
});

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
