const Wishlist = require("../models/Wishlist.model");
const { Types } = require("mongoose");

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({
      userId: Types.ObjectId(req?.userId),
    }).populate(["product"]);

    res.status(200).json({ status: true, data: wishlists });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    let { id } = req.params;

    let wishlist = await Wishlist.findOne({
      productId: Types.ObjectId(id),
      userId: Types.ObjectId(req?.userId),
    });

    if (wishlist) {
      await wishlist.delete();
    } else {
      await Wishlist.create({
        productId: id,
        userId: req?.userId,
      });
    }

    res.status(200).send({ status: true, message: "Wishlist updated" });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

exports.truncateWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({
      userId: Types.ObjectId(req?.userId),
    });
    res
      .status(200)
      .json({ message: "wishlist has been cleared", status: true });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};
