const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const expressValidator = require("express-validator");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

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
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static("public"));
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
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split(".");
      var root = namespace.shift();
      var formParam = root;
      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

/////ROUTE REGISTER/////
//homeController
app.get("/", homeController.indexPage);
app.get("/courses", homeController.showCourses);

//subscribersController
app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/subscribe", subscribersController.saveSubscriber);

//errorController
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

/////SERVER/////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
