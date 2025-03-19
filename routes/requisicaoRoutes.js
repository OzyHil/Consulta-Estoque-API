const express = require("express");
const router = express.Router();
const requisicaoConttroller = require("../controllers/requisicaoController");

router.get("/", requisicaoConttroller.getAllRequisicao);
router.get("/por-data", requisicaoConttroller.getRequisicoesPorIntervaloDeData);
router.post("/", requisicaoConttroller.addRequisicoes);

module.exports = router;