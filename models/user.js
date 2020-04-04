const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  telNumber: {
    type: mongoose.SchemaTypes.Phone,
    // required: "Phone number should be set correctly",
    allowBlank: false,
    allowedNumberTypes: [
      mongooseTypePhone.PhoneNumberType.MOBILE,
      mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE
    ],
    // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: "DE",
    parseOnGet: false
  },
  password: {
    type: String,
    min: [6, "6 characters minimum."],
    required: true
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  subscribedAccount: {
    type: Schema.Types.ObjectId,
    ref: "Subscriber"
  },
  timestamps: true
});

userSchema.virtual("fullName").get(function() {
  return `${this.name.firstName} ${this.name.lastName}`;
});

module.exports = mongoose.model("user", userSchema);
