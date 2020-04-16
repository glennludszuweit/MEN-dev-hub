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
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999,
    },
    maxStudents: {
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative number of students"],
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative cost"],
    },
    // image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
