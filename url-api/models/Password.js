const mongoose = require("mongoose");
const validator = require("validator");
const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide website name"],
    },
    link: {
      type: String,
      required: [true, "Please provide website link"],
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
