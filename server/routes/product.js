const express = require("express");
const router = express.Router();

const { addProduct, product, allProducts } = require("../controllers/product");

router.post("/add", addProduct);
router.get("/:id", product);
router.get("/", allProducts);

module.exports = router;
