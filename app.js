const express = require('express');
const app = express();
const port = 8080;

const patientRoutes = require("./routes/patient");

app.use("/", patientRoutes);

app.listen(port, () => {
  console.log(`Serveur listen in http://localhost:${port}`);
});
