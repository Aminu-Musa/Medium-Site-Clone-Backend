
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    fristname: {
      type: String,
      required: [true, "'firstname' is required"],
    },
    lastname: {
      type: String,
      required: [true, "'lastname' is required"],
    },
    phone: {
      type: String,
      required: [true, "'phone' is required"],
    },
    email: {
      type: String,
      required: [true, "'email' is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "'email' is required"],
      min:6
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
