const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imgName: {
    type: String,
    required: true,
  },
  imgData: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
