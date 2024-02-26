const mongoose = require("mongoose");

// Import the relevant schemas
const Recipe = require("../daos/recipes");
const User = require("../daos/users");

// Apply the text search plugin to the data schemas
Recipe.schema.plugin(require("mongoose-text-search"));
User.schema.plugin(require("mongoose-text-search"));

// Create text indexes
Recipe.schema.index({
  name: "text",
  description: "text",
  "ingredients.name": "text",
});

User.schema.index({
  name: "text",
  email: "text",
});

// Export the schema with the plugin applied
module.exports = Recipe;
module.exports = User;
