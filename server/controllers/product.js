const Product = require("../models/Product.model");

exports.addProduct = async (req, res) => {
  try {
    const { title, total_price, market_type, monetization, description } =
      req.body;

    const image =
      req.files &&
      req.files.user_image &&
      req.files.user_image[0] &&
      req.files.user_image[0].path;

    const newProduct = await Product.create({
      title,
      total_price,
      image,
      market_type,
      monetization,
      description,
    });

    await newProduct.save();
    res.status(200).json({ status: true, data: newProduct });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

exports.product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate([
      "isWishlist",
    ]);
    res.status(200).json({ status: true, data: product });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate(["isWishlist"]);
    res.status(200).json({ status: true, data: products });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};
