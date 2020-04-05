const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");

const app = express();
const port = process.env.PORT || 3000;

/////DATABASE/////
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/kitchenhub", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection made!");
});

/////MIDDLEWARE/////
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

/////ROUTE REGISTER/////
//homeController
app.get("/", homeController.indexPage);
app.get("/courses", homeController.showCourses);

//subscribersController
app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/subscribe", subscribersController.saveSubscriber);

//usersController
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/create", usersController.new);

//errorController
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

/////SERVER/////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
