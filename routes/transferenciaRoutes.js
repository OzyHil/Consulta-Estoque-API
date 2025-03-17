const express = require("express");
const router = express.Router();
const transferenciaConttroller = require("../controllers/transferenciaController");

router.get("/", transferenciaConttroller.getAllTransferencias);

module.exports = router;