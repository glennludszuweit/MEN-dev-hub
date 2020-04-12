"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController.js");
const usersController = require("./controllers/usersController.js");
const coursesController = require("./controllers/coursesController.js");

const app = express();
const router = express.Router();

//////////DATABASE
mongoose.connect("mongodb://localhost:27017/kitchenhub", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

//////////MIDDLEWARES
//Project Environment
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");

//Express Router
app.use("/", router);
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Flash Messages
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
      resave: false,
      saveUninitialized: false,
    },
  })
);
router.use(connectFlash());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//Static Layout
router.use(layouts);
router.use(express.static("public"));

//Body Parser
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(express.json());

//////////ROUTE REGISTERS
//Home Routes
router.get("/", homeController.index);

//Users Routes
router.get("/users/login", usersController.login);
router.post(
  "/users/login",
  usersController.authenticate,
  usersController.redirectView
);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

//Subscribers Routes
router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

//Courses Routes
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);
router.get("/courses/:id/edit", coursesController.edit);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

//Error Routes
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

//////////SERVER
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
