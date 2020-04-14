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
    // password: body.password,
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
  //////Users Login
  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: (req, res, next) => {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user) {
          user.passwordComparison(req.body.password).then((passwordsMatch) => {
            if (passwordsMatch) {
              res.locals.redirect = `/users/${user._id}`;
              req.flash("success", `${user.fullName} logged in.`);
              res.locals.user = user;
            } else {
              req.flash("error", "Incorrect Password.");
              res.locals.redirect = "/users/login";
            }
            next();
          });
        } else {
          req.flash("error", "User Account not found.");
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch((error) => {
        console.log(`Error logging in: ${error.message}`);
        next(error);
      });
  },
  //////Validate data with express-validator
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req.check("email", "Email is invalid.").isEmail().notEmpty();
    req
      .check("mobileNum", "Mobile number is invalid.")
      .isInt()
      .isLength({
        min: 11,
        max: 11,
      })
      .equals(req.body.mobileNum);
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
  //////Create User
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

  //////User Lists
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
};
