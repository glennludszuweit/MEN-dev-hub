const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  telNumber: {
    type: mongoose.SchemaTypes.Phone,
    required: "Phone number should be set correctly",
    allowBlank: false,
    allowedNumberTypes: [
      mongooseTypePhone.PhoneNumberType.MOBILE,
      mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE
    ],
    // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: "DE",
    parseOnGet: false
  },
  address: String
});

module.exports = mongoose.model("Course", courseSchema);
