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
    // salt: {
    //   type: String,
    //   required: true,
    // },
    // iterations: {
    //   type: Number,
    //   required: true,
    // },
    // token: {
    //   type: String,
    // },
    // expire_at: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);