const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");

const homeController = require("./controllers/homeController");

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
app.use(express.static("public"));

//ROUTE REGISTER
app.get("/", homeController.indexPage);
app.get("/", homeController.showCourses);
app.get("/", homeController.showSignUp);
app.post("/", homeController.postedSignUpForm);

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
