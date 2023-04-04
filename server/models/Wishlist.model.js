const { Schema, model, plugin } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const wishListSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

plugin(mongoosePaginate);

wishListSchema.virtual("product", {
  localField: "productId",
  foreignField: "_id",
  ref: "Product",
  justOne: true,
});

wishListSchema.virtual("user", {
  localField: "userId",
  foreignField: "_id",
  ref: "User",
  justOne: true,
});

module.exports = model("Wishlist", wishListSchema);
