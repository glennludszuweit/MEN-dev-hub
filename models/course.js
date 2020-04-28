const mongoose = require("mongoose");
const { Schema } = require("mongoose");

var courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    embedUrl: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ name: "text", description: "text", author: "text" });

module.exports = mongoose.model("Course", courseSchema);
