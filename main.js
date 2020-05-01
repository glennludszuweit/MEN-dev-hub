"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const passport = require("passport");

const router = require("./routes/index");
const User = require("./models/user");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://devhub:admin123@node-devhub-mwfvv.mongodb.net/test?retryWrites=true&w=majority" ||
    "mongodb://localhost:27017/kitchenhub",
  {
    useNewUrlParser: true,
  }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
app.set("port", process.env.PORT || 8080);

//Project Environment
app.set("view engine", "ejs");

app.use("/courses/uploads", express.static("uploads"));
app.use("/users/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(layouts);

//Body Parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//Method Override
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Session and Cookies
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
      resave: false,
      saveUninitialized: false,
    },
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash Messages
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//Express Validator
app.use(expressValidator());

//Routes
app.use("/", router);

//Chat
const server = app.listen(app.get("port"), () => {
    console.log(`Server running`);
  }),
  io = require("socket.io")(server);
require("./controllers/chatController")(io);
