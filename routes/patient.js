const express = require("express");
const router = express.Router();

const patientCtrl = require("../controllers/patients.controller");

router.post("/signup", patientCtrl.signup);
router.post("/login", patientCtrl.login);
router.get("/patients", patientCtrl.getPatientsWithFactures);
router.delete("/patients/:patientId", patientCtrl.deletePatient);
router.put("/patients/:patientId", patientCtrl.updatePatient);

module.exports = router;