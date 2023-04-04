const { getPath } = require("../helpers/index");
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
      get: (value) => getPath(value),
    },
    total_price: {
      type: Number,
      default: 0,
    },
    no_of_tokens: {
      type: Number,
      default: 50,
    },
    token_price: {
      type: Number,
      get: function () {
        return this.total_price / this.no_of_tokens;
      },
      default: 0,
    },
    market_type: {
      type: String,
      required: true,
    },
    monetization: {
      type: String,
      default: "Affiliate",
    },
    profit: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

productSchema.virtual("isWishlist", {
  ref: "Wishlist",
  localField: "_id",
  foreignField: "productId",
  count: true,
});

module.exports = model("Product", productSchema);
