const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    // secQues:{
    //     type: String,
    //     required: true,
    // },
    // secAns:{
    //     type: String,
    //     required: true,
    // },
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
