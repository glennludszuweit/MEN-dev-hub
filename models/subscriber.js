const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  telNumber: {
    type: Number
  }
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Tel Number: ${this.telNumber}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ name: this.name })
    .exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
