const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  coursesController = require("./controllers/coursesController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

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
