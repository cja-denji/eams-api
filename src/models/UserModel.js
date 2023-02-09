// import mongoose module
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Provided email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  usertype: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("__tbluser", userSchema);
module.exports = User;
