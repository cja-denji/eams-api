// import mongoose module
const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const accomplishmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "submitted",
  },
  user_id: {
    type: ObjectID,
    required: true,
    trim: true,
  },
});

const Accomplishment = mongoose.model(
  "__tblaccomplishment",
  accomplishmentSchema
);
module.exports = Accomplishment;
