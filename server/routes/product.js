const express = require("express");
const router = express.Router();

const { addProduct, product, allProducts, deleteProduct } = require("../controllers/product");

router.post("/add", addProduct);
router.get("/:id", product);
router.get("/", allProducts);
router.post('/deleteProduct/:id' , deleteProduct)

module.exports = router;
