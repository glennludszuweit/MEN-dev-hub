const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//DATABASE
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection made!");
});

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
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

//ERROR HANDLING
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
