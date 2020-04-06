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
      .then(() => {
        res.render("thanks");
      })
      .catch(error => {
        if (error) {
          res.send(error);
        }
      });
  }
};
