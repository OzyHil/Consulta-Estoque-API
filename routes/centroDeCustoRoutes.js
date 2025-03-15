const express = require("express");
const router = express.Router();
const centroDeCustoConttroller = require("../controllers/centroDeCustoController");

router.get("/", centroDeCustoConttroller.getAllCentroDeCustos);

module.exports = router;