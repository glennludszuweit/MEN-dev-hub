const Subscriber = require("../models/subscriber");

module.exports = {
  getAllSubscribers: (req, res) => {
    Subscriber.find({})
      .exec()
      .then(subscribers => {
        res.render("subscribers", {
          subscribers: subscribers
        });
      })
      .catch(error => {
        console.log(error.message);
        return [];
      });
  },

  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      telNumber: req.body.telNumber
    });

    newSubscriber
      .save()
      .then(result => {
        res.render("thanks");
      })
      .catch(error => {
        if (error) {
          req.flash(
            "alert alert-danger",
            "Please add registered mobile number or leave blank."
          );
          res.redirect("/contact");
        }
      });
  }
};
