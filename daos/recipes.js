const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // image: {
    //   // need this to be URL to facilitate FE rendering
    //   type: String,
    // },
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
      /* to update type as Date later when util functions are up. keeping it
    as number for now to faciltiate testing.*/
    },
    ingredients: {
      type: [String], //use array to enable multiple values
      required: true,
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
