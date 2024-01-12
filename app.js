const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
import cors from "cors";
import mainRouter from "./src/routes";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1", (req, res) => {
  res.send("hello there");
});
app.use("/api", mainRouter);

// mongoose connection
mongoose.connect(process.env.DB_CONNECT).then((res) => {
  console.log("database connected well");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
