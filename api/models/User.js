const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    hobbies: [
      {
        type: String,
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Users", userSchema);
