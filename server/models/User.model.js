const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoosePaginate = require("mongoose-paginate-v2");
const { getPath } = require("../helpers/index");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    phone_no: {
      type: String,
      required: [true, "Phone number field is required"],
    },
    user_image: {
      type: String,
      default: null,
      get: (value) => getPath(value),
    },
    cnic_image_front: {
      type: String,
      default: null,
      get: (value) => getPath(value),
    },
    cnic_image_back: {
      type: String,
      default: null,
      get: (value) => getPath(value),
    },
    status: {
      type: Boolean,
      default: true,
      required: [true, "User status is required"],
    },
    auth: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

userSchema.index({ name: "text" });
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
