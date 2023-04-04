const express = require("express");
const router = express.Router();

const { getRate } = require("../controllers/eth");

router.get("/", getRate);

module.exports = router;
