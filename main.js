const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const Subscriber = require("./models/subscriber");

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

//DATABASE
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection made!");
});

//SCHEMA
var myQuery = Subscriber.findOne({
  name: "Tony Patterdale"
}).where("email", /patterdale/);
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

// var subs1 = new Subscriber({
//   name: "Tony Patterdale",
//   email: "t.patterdale@gmail.com"
// });

// subs1.save((error, savedDocument) => {
//   if (error) console.log(error);
//   console.log(savedDocument);
// });

// Subscriber.create(
//   {
//     name: "Tony Patterdale",
//     email: "t.patterdale@gmail.com"
//   },
//   function(error, savedDocument) {
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

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
