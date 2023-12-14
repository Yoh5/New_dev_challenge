const express = require("express");
const router = express.Router();

const patientCtrl = require("../controllers/patients.controller");

router.post("/signup", patientCtrl.signup);
router.post("/login", patientCtrl.login);

module.exports = router;
