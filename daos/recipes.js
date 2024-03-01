const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      properties: {
        name: {
          type: "string", // Consider VARCHAR(255) if there's a maximum length
          required: true,
        },
        data: {
          type: Buffer, // buffer = store raw data; "string" - Base64 encoded image data (optional)
          required: true,
        },
        contentType: {
          type: "string", //captures the file MIME type, eg, img, png, svg
          retuired: true,
        },
      },
      default:
        "https://edamam-product-images.s3.amazonaws.com/web-img/564/5648dc3132160f07414fb225f45c1d09.gif?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLWVhc3QtMSJHMEUCIQCjLwixnaB0iiv3W%2BiHFA5q%2B72wlDdXsWwp2P9c0au5ZgIgBUItkmVyzgD7pZzDvVsEFZE%2F9kTZOzWj59ivjaAZB8gquQUIIBAAGgwxODcwMTcxNTA5ODYiDK9j%2F6XSJKhaHTaaryqWBWHVI9OtYu8i8cvJfiBXwJcdDhsOOWRgA2GJmk6ao1ouKg8Zj9dioXhWoF9eXOn%2B7V4bnbCpg2hKY5tZVN9Vph%2Ba9n%2FSfQiqySqgy%2FN1ctiBwNU6MeEjmXmFZeNSFaBRzw99RMZPDUxaLQeb02NKyy4D45fTyiiokjOkBsiynLah%2FbdThB6FuEkBDjlI2ieY%2FMzcJ68ljAdU%2FKyTOS1pf6%2FZV1lt6lWb3duil1IaWCP%2FB5g7YGL5JFNx5Teezf5%2FhLsJGGFr%2F8PPAZiqQ%2FSpg1wlgcklWIi8KN8iVawTaSHgiiXSs9l6p9ovWxuYQk%2BvLZjSRtjo5kgEOtCpM%2BvHwaUpk3iywT8%2B%2FNzPuOT9WuKLRzFSfl97fyg7L7r3%2Bwx0UfT%2FX7WxNipkts2Ks2eRRlYBZJQ%2FiAcxn2sXYWDPJAX7BuaCBnn7IZ3Qgq9jD51Nkz6g32qh4IuV0N5zBR4DfSH%2BfepUhzbUR4ZMVXFZ%2FYEe1c0OIC9lq2A4T0ZZ6Vth6uQcEziuUuERJZ0qiFM%2F4JMOB3MZEMbUv%2FcZIJcW3UShx46iXd1klc0wgJi7p84Q2CVjcHn2%2Fqt%2FTmdwekIas4Wq1B7vaCHuh5B9Gk7M4U%2Fa5eP3kgGWlMGLNaB0X2VFG6r5wcnOMejfjZ%2FzD47EuCkrhzseNtgBhuitF8uV91DD%2BMRxOJ8hUu%2F8O%2FKFQlTliqZVSUttFbr4b6kZKD9wBW%2FnCNR49lhjakm60hHOORKok48I8naIQtaOeMkhi9pcqrn1oNdhoOyzSHJkj5iqL6RcgUV6kWf1zXdwtN7moz33SGiwmbbaWEeNJ4vNyoarqEQf0KF0lfVQxnjkiezbicqI0etq65lurVfD%2Fu5RPIcchy4%2Bu6x%2FMIiUhK8GOrEB72GjOwKq%2FW4lIdLg5WJtFiFMV1ig08BoipzS70fQy%2B%2BqFp7E4wLbXlZ75cV9UQtQg4q%2FjgZwCXno48hhKyBpDa22dtj2MoDDwTPjZb9O%2BogxwNSuurMJ6DaBuUQw3N1c8PCpk2Dh0%2B6iDjkNiwEHe7llPFb8CN89Lu%2BxrfaFaUM6FxbefRbglTGURiBC7DL46pE%2F7d9TP1nN9IVJIpRCXoazmh6rdBkq27%2BEwx8MZgJD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240301T001941Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFMGKP6OIS%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=eb03192290be82cc4ff01bb2776ced5e030d21a13696923a6ec1261013a3e5ea",
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
    source: {
      type: String,
      default: "AppUser",
      required: true,
    },
    edamamId: {
      type: String,
    },
    // by refactoring as type: [ObjectID] ref: XXXX
    // we will be able to inform the populate() method which dao/model's documents
    // (containing the schema) to use to replace the ObjectIds with
    bookmarked: {
      type: [String], //array of user data
      default: [],
    },
    notes: {
      type: Schema.Types.ObjectId,
      ref: "Notes",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: "65d443ddbe873f42ef4ca680", //admin user ID
    },
  },
  {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
