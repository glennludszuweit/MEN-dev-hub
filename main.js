const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

/////DATABASE/////
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/kitchenhub", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection made!");
});

/////MIDDLEWARE/////
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
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

//usersController
app.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

//errorController
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

/////SERVER/////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
