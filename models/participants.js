const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);