const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const url = require("url");

app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.get("/api/v1/todos", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    res.send(JSON.parse(data));
  });
});

app.post("/receive", function (req, res) {
  if (req.body) {

    res.send(req.body);
    fs.writeFile("./data.json", JSON.stringify(req.body), (err) => {});
    res.status(200).json("thanh cong");
  } else {
    res.status(404).json("fail");
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});


