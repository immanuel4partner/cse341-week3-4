const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
      required: true,
    },

    sessionCode: {
      type: String,
      required: true,
    },

    facilitator: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    schedule: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);