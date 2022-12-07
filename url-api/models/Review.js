const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    port: {
      type: Number,
      required: [true, "Please provide port number"],
    },
    ipaddress: {
      type: String,
      required: [true, "Please provide ip address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
