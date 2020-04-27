const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const chatSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
