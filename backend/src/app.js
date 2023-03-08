const express = require("express");
const cors = require("cors");

// load handlers
const { formPostHandler } = require("./handlers/formHandlers");

const sendMail = require("./handlers/email");

// app
const app = express();

//setup cors middleware
app.use(cors());

// allow sending of json data
app.use(express.json())

app.get("/test", (req, res) => {
  res.json({ message: "Server Is up and running" });
});

app.post("/form", formPostHandler);
app.post("/sendemail",sendMail)


module.exports = app;
