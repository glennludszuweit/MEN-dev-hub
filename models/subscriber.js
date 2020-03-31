const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  telNumber: Number
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
