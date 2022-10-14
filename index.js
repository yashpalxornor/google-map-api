const express = require("express");

const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const Shops = require("./models/shops");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const ejs = require("ejs");

const path = require("path");

let uri = "mongodb://localhost:27017/mongoto";

mongoose.connect(uri, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mongo", uri);
  }
});

app.set("views", path.join(__dirname, "static"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

app.get("/shops", async (req, res) => {
  try {
    //console.log("mjkjkjkjkjk");
    let data = await Shops.find({
      // location: {
      //   $near: {
      //     $maxDistance: 10000000,
      //     $geometry: {
      //       type: "Point",
      //       coordinates: [28.679079, 77.06971],
      //     },
      //   },
      // },
    }).sort({createdAt:-1}).limit(2);
    console.log(data);
    res.send({ message: "Success", statusCode: 200, data: data });
  } catch (err) {
    res.send({ message: err.message, statusCode: 400 });
  }
});

app.post("/shops", async (req, res) => {
  try {
    console.log(req.body);
    let newShop = await Shops.create({
      title: req.body.title,
      location: { type: "Point", coordinates: req.body.coordinates },
    });
    console.log("new shop", newShop);
    res.send({ message: "Success", statusCode: 200 });
  } catch (err) {
    res.send({ message: err.message, statusCode: 400 });
  }
});

app.listen(5000, () => {
  console.log("started my server", 5000);
});
