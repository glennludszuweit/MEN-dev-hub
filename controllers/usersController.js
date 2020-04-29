"use strict";

const Course = require("../models/course");
const User = require("../models/user");
const passport = require("passport");

const getUserParams = (body) => {
  return {
    name: {
      first: body.first,
      last: body.last,
    },
    email: body.email,
    mobileNum: body.mobileNum,
    password: body.password,
  };
};

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },

  //////Create User
  new: (req, res) => {
    res.render("users/login");
  },

  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash(
          "success",
          `${user.fullName}'s account created! Please proceed to login.`
        );
        res.locals.redirect = "/users/login";
        next();
      } else {
        req.flash("error", `Failed: ${error.message}`);
        res.locals.redirect = "/users/login";
        next();
      }
    });
  },

  //////User Lists
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .populate("courses")
      .exec()
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  //////Edit/Update User
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.render("users/edit", {
          user: user,
        });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id;
    let userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        req.flash("success", `${user.fullName}'s account updated!`);
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        res.locals.redirect = `/users/${userId}/edit`;
        req.flash("error", `Falied: ${error.message}`);
        next(error);
      });
  },

  //////Delete User
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        req.flash("success", `${user.fullName}'s account deleted!`);
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },

  //////Users Login
  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "Logged in!",
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
  }),

  validate: (req, res, next) => {
    req.check("email", "Email is invalid.").isEmail().notEmpty();
    req
      .check("zipCode", "Zip code is invalid.")
      .notEmpty()
      .isInt()
      .isLength({
        min: 5,
        max: 5,
      })
      .equals(req.body.zipCode);
    req
      .check("password", "Password must be atleast 6 characters.")
      .notEmpty()
      .isLength({
        min: 6,
      });
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "Logged out successfuly!");
    res.locals.redirect = "/";
    next();
  },
};
