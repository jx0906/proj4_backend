const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Images",
    },
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
      type: ["object"], // Define ingredients as an array of objects with qty, ingreName and unit fields
      required: true,
      properties: {
        quantity: {
          type: Number,
          min: 0,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
        ingredientName: {
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
