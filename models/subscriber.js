const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");
const { Schema } = mongoose;

var subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    mobileNum: {
      type: mongoose.SchemaTypes.Phone,
      allowBlank: true,
      allowedNumberTypes: [
        mongooseTypePhone.PhoneNumberType.MOBILE,
        mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      ],
      defaultRegion: "DE",
      parseOnGet: false,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Mobile: ${this.mobileNum}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
