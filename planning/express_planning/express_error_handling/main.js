const express = require("express");
const layouts = require("express-ejs-layouts");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(layouts);

//ROUTES
app.get("/name/:myName", homeController.resWithName);

//ERROR HANDLING
app.use(errorController.resourceNotFound);
app.use(errorController.internalError);

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
