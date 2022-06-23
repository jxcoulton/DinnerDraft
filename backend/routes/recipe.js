"use strict";
var axios = require("axios");
var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
router.get("/", function (req, res) {
    // axios(req.body.url)
    axios("https://www.tasteofhome.com/recipes/sour-cream-chocolate-cookies/")
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
        return res.json({
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
module.exports = router;
