"use strict";

const Subscriber = require("../models/subscriber");
const nodemailer = require("nodemailer");

const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    mobileNum: body.mobileNum,
  };
};

module.exports = {
  index: (req, res, next) => {
    Subscriber.find()
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        req.flash("success", `${subscriber.name} subscribed successfuly!`);
        res.locals.redirect = "/subscribers/new";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        res.locals.redirect = "/subscribers/new";
        req.flash("error", `Falied: ${error.message}`);
        next();
      });
  },

  contact: (req, res) => {
    res.render("subscribers/contact");
  },

  send: (req, res, next) => {
    const output = `
      <p>You have a new message.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.contactMsg}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "d262be34a8992c", // generated ethereal user
        pass: "cc5cf3e73fc3cb", // generated ethereal password
      },
    });

    let mailOptions = {
      from: '"DevHub" <gnglab.dev@gmail.com>', // sender address
      to: "glenn.ludszuweit@gmail.com", // list of receivers
      subject: `DevHub Message from ${req.body.email}`, // Subject line
      text: "", // plain text body
      html: output, // html body
    };
    transporter
      .sendMail(mailOptions)
      .then(() => {
        req.flash("success", `Message Sent!`);
        res.locals.redirect = "/contact";
        next();
      })
      .catch((error) => {
        res.locals.redirect = "/contact";
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
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.render("subscribers/edit", {
          subscriber: subscriber,
        });
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams,
    })
      .then((subscriber) => {
        req.flash("success", `${subscriber.name}'s account updated!`);
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        req.flash("error", `Failed: ${error.message}`);
        res.locals.redirect = `/subscribers/${subscriberId}/edit`;
        next();
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        req.flash("success", `${subscriber.fullName}'s account deleted!`);
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },
};
