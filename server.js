// Require Express and set up app instance
const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

let projectData = {};

// GET
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST
app.post("/add", (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  res.send(projectData);
});

// server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
