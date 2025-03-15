const express = require("express");
const router = express.Router();
const empresaConttroller = require("../controllers/empresaController");

router.get("/", empresaConttroller.getAllEmpresas);

module.exports = router;