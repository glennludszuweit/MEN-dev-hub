const express = require("express");
const layouts = require("express-ejs-layouts");

const homeController = require("./controllers/homeController");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(layouts);

//ROUTES
app.get("/name/:myName", homeController.resWithName);

//SERVER

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
