const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index");
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    let userParams = {
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      email: req.body.email,
      telNumber: req.body.telNumber,
      password: req.body.password,
    };
    User.create(userParams)
      .then((user) => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(error.message);
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
        console.log(error.message);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id;
    let userParams = {
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      email: req.body.email,
      telNumber: req.body.telNumber,
      password: req.body.password,
    };
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
