"use strict";
var express = require("express");
var cors = require("cors");
var recipe = require("./routes/recipe");
var app = express();
app.use(cors());
// app.use(function (req: any, res: any, next: any) {
//   res.header("Access-Control-Allow-Origin", "dinner-draft.vercel.app/");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "POST");
//   next();
// });
app.use(express.json());
app.use("/recipe", recipe);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
module.exports = {};
