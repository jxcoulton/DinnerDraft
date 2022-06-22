"use strict";
var PORT = process.env.PORT || 8080;
var axios = require("axios");
var express = require("express");
var cheerio = require("cheerio");
var cors = require("cors");
var app = express();
app.use(cors());
// app.use(function (req: any, res: any, next: any) {
//   res.header("Access-Control-Allow-Origin", "dinner-draft.vercel.app/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(express.json());
app.post("/", function (req, res) {
    axios(req.body.url)
        .then(function (response) {
        var html = response.data;
        var $ = cheerio.load(html);
        var ingredients = [];
        var directions = [];
        var title = "";
        $("h1").each(function () {
            var text = $(this).html().trim();
            title = text;
        });
        $("div")
            .find($('[class*="ingredient"] li'))
            .each(function () {
            var text = $(this).text().trim();
            ingredients.push(text);
        });
        $("div")
            .find($('[class*="direction"] li, [class*="instruction"] li, [class*="step"] li'))
            .each(function () {
            var text = $(this).text().trim();
            directions.push(text);
        });
        res.json({
            recipe: {
                title: title,
                ingredients: ingredients,
                directions: directions,
                url: req.body.url,
            },
        });
    })
        .catch(function (err) { return console.log(err); });
});
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
