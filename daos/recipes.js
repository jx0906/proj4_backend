const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      properties: {
        imgname: {
          type: "string", // Consider VARCHAR(255) if there's a maximum length
          required: true,
          default:
            "https://edamam-product-images.s3.amazonaws.com/web-img/286/28635841b2d4c8c057dfa4191d322da1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECwaCXVzLWVhc3QtMSJHMEUCIQCPKGRUkwQ65IsOJ98Ke8wuiBOkiIdxz5JJuzclc%2BpG%2BwIgMc3ntlXStnoDi0LfB0iHvTBTmFkIrzYCWcC5hs27pIQquQUIJRAAGgwxODcwMTcxNTA5ODYiDN2o5V8kDt1fmipKAiqWBSUiKw4ikqBOV4LCXel13vMlzZ96eJ38iFGzkZe%2BsiaTqjbPVGkWsf5SRnVcf33yl2na7hvpGHFk6vmy8k79SBg2GFh3V%2FIj%2FR4LZyHlwzpY0ycMbNNwaoYE46xJLBdh3ZDw5OiSaxjzs5BRCNdHH9N5Dt8v2ST3dAjNBEeTHheteFSdDQh3Tn1aGXpnqRW9%2FZ5lwTDl3Yir1vxEJQwmtymMi4j%2Fw7Z%2FG8l4Y%2FEmPXOVEaPBVGg7GW7V7NwVtjIB1xS%2FybDRVB778tgEj%2B8X1XeycGshM1Ew5FlWuZ%2BvrTHcArMiYL0adyEM3%2BBW6hXNevI1l2dUIKh%2Fq6RJMs6xiD6wYNyIVHFRriYXk3%2B343AkuT9rGw1zBea%2B6abHobo4xUVBbbG0lwG2CWvQGvFkWU8J62mb3AyZxSirA68VPP9smeRc0xqslLHBNpyu2UFVWxsg427hXNYIhGrMxCsyJQkHXby4SfciXI9q1tSp9FHiNpzLF8j4ybOg79zWgNA9LPnl3ioWpC4NigLKNyqYdKIf2ajgJ2zxaJQei8a8k4ENCoQEwaQfRighPmCBznLOs%2Bjf5amDOUWHHZ6LbCiHOKDrfAlh7yyyhqn%2FiNpT4%2FZZq4%2FLDN6jQzvoNtt9r5R9NvSSKR%2B7SDk8NyM2QcSRV2LHpRaLqNr59m533aNQR%2Bjx%2FnLbfTGuB16T6CopjuSTjGrRX%2Fh%2Fa%2FLg4uXI9gl035PMAXA5CDs7EKjjxcHXgePQdtWLrPRRkZSidkobtOhpCzSW3%2Fh%2FsSUSvZrDbm9arxCu8n%2B9I05kCCLKpVaR%2FS5aAhKQ0tawBnITiFd6%2FMDBDyKl%2FNl2S%2Fe1AFFdw%2F4TayOpLBO%2BEFYk9T5ILn5afNMe1AxA23InMOKeha8GOrEBc7UdeSPUV5tT8B5BfuUiZ%2FnztQVJAgnYdvxZSy61vvYX4nBHMzu5Kj7GuHeo10f5M9GA%2FJ9nA8ZGP1duLCdTG3YQL17Hdm38ImJ4oanuEG6bCLktV4htkc5fx%2BU3f8tAEs%2B%2BuURSVnqs36QDnQdmYv2fY7oYI99BM1u8JXBmC7f5dPsmU3R71MI6NOGONQ1YAPyPChrv2g%2FdbfmqQGXSMEcEN2aeid2znTgDlR284CQZ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240301T052748Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFPYUDP3F5%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1db82921ff5f93147dca960a573883e78deebd2a790ecc37cbae288c4582c3d5",
        },
        // imgdata: {
        //   type: Buffer, // buffer = store raw data; "string" - Base64 encoded image data (optional)
        // },
        imgContentType: {
          type: "string", //captures the file MIME type, eg, img, png, svg
        },
      },
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
