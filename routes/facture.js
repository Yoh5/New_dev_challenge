const express = require("express");
const router = express.Router();

const factureCtrl = require("../controllers/factures.controller");

router.post("/factures", factureCtrl.createFacture);
router.get("/factures", factureCtrl.getFacture);
router.delete("/factures/facture:id", factureCtrl.deleteFacture);
router.put("/factures/facture:id", factureCtrl.updateFacture);

module.exports = router;
