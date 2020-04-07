const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");
const { Schema } = mongoose;
const Subscriber = require("./subscriber");

const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  telNumber: {
    type: mongoose.SchemaTypes.Phone,
    // required: "Phone number should be set correctly",
    allowBlank: true,
    allowedNumberTypes: [
      mongooseTypePhone.PhoneNumberType.MOBILE,
      mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
    ],
    // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: "DE",
    parseOnGet: false,
  },
  password: {
    type: String,
    min: [6, "6 characters minimum."],
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  subscribedAccount: {
    type: Schema.Types.ObjectId,
    ref: "Subscriber",
  },
  timestamps: { type: Date, default: Date.now },
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
