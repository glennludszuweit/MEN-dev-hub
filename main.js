const express = require("express");
const httpStatus = require("http-status-codes");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

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

/////ROUTE REGISTER/////
//homeController
app.get("/", homeController.indexPage);
app.get("/courses", homeController.showCourses);

//subscribersController
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
    res.render("subscribers", { subscribers: req.data });
  }
);

//errorController
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

/////SERVER/////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
