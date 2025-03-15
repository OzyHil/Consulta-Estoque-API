const express = require("express");
const router = express.Router();
const departamentoConttroller = require("../controllers/departamentoController");

router.get("/", departamentoConttroller.getAllDepartamentos);

module.exports = router;