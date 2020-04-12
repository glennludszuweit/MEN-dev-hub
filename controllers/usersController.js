"use strict";

const User = require("../models/user");

const getUserParams = (body) => {
  return {
    name: {
      first: body.first,
      last: body.last,
    },
    email: body.email,
    mobileNum: body.mobileNum,
    password: body.password,
    zipCode: body.zipCode,
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

  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: (req, res, next) => {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user && user.password === req.body.password) {
          res.locals.redirect = `/users/${user._id}`;
          req.flash("success", `${user.fullName}'s login successful!`);
          res.locals.user = user;
          next();
        } else {
          req.flash("error", "Email or Password incorrect.");
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch((error) => {
        console.log(`Error logging in: ${error.message}`);
        next(error);
      });
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    let userParams = getUserParams(req.body);

    User.create(userParams)
      .then((user) => {
        req.flash("success", `${user.fullName}'s account created successfuly!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        res.locals.redirect = "/users/new";
        req.flash("error", `Falied: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
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
};
