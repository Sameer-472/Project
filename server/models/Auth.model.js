const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const User = require("./User.model");

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

authSchema.virtual("user_auth", {
  ref: User,
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Auth", authSchema);
