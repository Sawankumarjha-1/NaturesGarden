require("./db");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Middle Ware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:19000" }));
app.use(morgan("dev"));
app.use("/api/", require("./path"));

//Listening at PORT
app.listen(PORT, () => {
  console.log(PORT);
});
