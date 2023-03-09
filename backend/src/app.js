const express = require("express");
const cors = require("cors");

// load handlers
const { formPostHandler } = require("./handlers/formHandlers");

// app
const app = express();

//setup cors middleware
app.use(cors());

// allow sending of json data
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server Is up and running" });
});

app.post("/form", formPostHandler);

module.exports = app;
