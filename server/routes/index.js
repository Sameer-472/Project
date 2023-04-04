const express = require("express");
const router = express.Router();

const auth = require("./auth");
const product = require("./product");
const eth = require("./eth");
const wishlist = require("./wishlist");

router.use("/auth", auth);
router.use("/products", product);
router.use("/eth-rate", eth);
router.use("/wishlist", wishlist);

module.exports = router;
