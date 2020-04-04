const User = require("../models/user");

module.exports = {
  index: (req, res) => {
    User.find({})
      .exec()
      .then(users => {
        res.render("users/index", {
          users: users
        });
      })
      .catch(error => {
        console.log(error.message);
        res.redirect("/");
      })
      .then(() => {
        console.log("Promise completed!");
      });
  }
};
