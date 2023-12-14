const express = require('express');
const app = express();
const port = 8080;

// const userRoutes = require("./routes/user");
// const authGoogleRoutes = require("./routes/authGoogle");

// app.use("/", userRoutes);
// app.use("/", authGoogleRoutes);

app.listen(port, () => {
  console.log(`Serveur listen in http://localhost:${port}`);
});
