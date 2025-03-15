const express = require("express");
const router = express.Router();
const transferenciaConttroller = require("../controllers/produtoController");

router.get("/", transferenciaConttroller.getAllProdutos);

module.exports = router;