const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/authMiddleware");

const {
  getWishlists,
  updateWishlist,
  truncateWishlist,
} = require("../controllers/wishlist");

router.get("/", verifyUserToken, getWishlists);
router.get("/update/:id", verifyUserToken, updateWishlist);
router.delete("/clear", verifyUserToken, truncateWishlist);

module.exports = router;
