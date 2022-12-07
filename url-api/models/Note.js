const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide website name"],
    },
    note: {
      type: String,
      required: [true, "Please provide note"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
