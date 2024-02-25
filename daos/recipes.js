const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // image:{
    // type: [Object],
    // properties:{
    //   name: {
    //     type: "string", // Consider VARCHAR(255) if there's a maximum length
    //     required: true,
    //   },
    //   data: {
    //     type: Buffer, // buffer = store raw data; "string" - Base64 encoded image data (optional)
    //     required: true,
    //   },
    //   contentType: {
    //     type: "string", //captures the file MIME type, eg, img, png, svg
    //     retuired: true,
    //   },
    // },
    //},
    category: {
      type: String,
      enum: ["Pastries", "Biscuits", "Bread", "Cakes"],
      required: true,
    },
    levelOfDiff: {
      type: String,
      enum: ["Easy", "Intermediate", "Advanced"],
      required: true,
    },
    timeRequired: {
      type: Number,
      required: true,
      min: 1,
    },
    servings: {
      type: Number,
      min: 1,
    },
    ingredients: {
      type: [Object],
      properties: {
        quantity: {
          type: Number,
          min: 0,
          required: true,
        },
        unit: {
          type: String,
        },
        name: {
          type: String,
          required: true,
        },
      },
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // by refactoring as type: [ObjectID] ref: XXXX
    // we will be able to inform the populate() method which dao/model's documents
    // (containing the schema) to use to replace the ObjectIds with
    notes: {
      type: Schema.Types.ObjectId,
      ref: "Notes",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //   to uncomment after the base code is tested to be working
      // required: true,
    },
  },
  {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
