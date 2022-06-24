"use strict";
var axios = require("axios");
var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
var re = new RegExp("^[0-9]+$");
router.post("/", function (req, res) {
    axios(req.body.url)
        // axios("https://www.tasteofhome.com/recipes/sour-cream-chocolate-cookies/")
        .then(function (response) {
        var html = response.data;
        var $ = cheerio.load(html);
        var ingredients = [];
        var directions = [];
        var title = "";
        var keyword;
        //recipe name
        $("h1").each(function () {
            var text = $(this).html().trim();
            title = text.replace(/(<([^>]+)>)/gi, "");
        });
        //instructions
        //search all h tags
        $("h1, h2, h3, h4, h5, h6")
            //find the h with inner text containing 'ngredients'
            .filter(function () {
            return $(this).text().indexOf("ngredients") > -1;
        })
            //closest parent that has a 'li' child
            .closest($(":not(a)").has("li"))
            //find the 'ul' or 'ol' of that child
            .find($("ol, ul"))
            //filter to verify 2/3 of the children contain numbers or fractions
            .filter(function () {
            return ($(this)
                .children()
                .filter(function () {
                return ($(this)
                    .text()
                    .search(/[0-9]|¼|½|¾|⅔|⅓/g) > -1);
            }).length >=
                $(this)
                    .children()
                    .filter(function () {
                    return $(this).text();
                }).length *
                    0.66);
        })
            //get the 'li'
            .find("li")
            //for each 'li', if not in the array then push into array and remove leftover html
            .each(function () {
            var text = $(this).text().trim();
            if (!ingredients.includes(text)) {
                ingredients.push(text.replace(/(<([^>]+)>)|▢/gi, ""));
            }
        });
        //find keyword (ie: instructions, directions, preparation, steps, method)
        if ($("h1, h2, h3, h4, h5, h6").filter(function () {
            return $(this).text().indexOf("nstruction") > -1;
        }).length) {
            keyword = "nstruction";
        }
        else if ($("h1, h2, h3, h4, h5, h6").filter(function () {
            return $(this).text().indexOf("irection") > -1;
        }).length) {
            keyword = "irection";
        }
        else if ($("h1, h2, h3, h4, h5, h6").filter(function () {
            return $(this).text().indexOf("reparation") > -1;
        }).length) {
            keyword = "reparation";
        }
        else if ($("h1, h2, h3, h4, h5, h6").filter(function () {
            return $(this).text().indexOf("tep") > -1;
        }).length) {
            keyword = "tep";
        }
        else if ($("h1, h2, h3, h4, h5, h6").filter(function () {
            return $(this).text().indexOf("ethod") > -1;
        }).length) {
            keyword = "ethod";
        }
        //get directions
        //search all h tags
        $("h2, h3, h4, h5, h6")
            //filter h tags that contain the keyword
            .filter(function () {
            return $(this).text().indexOf(keyword) > -1;
        })
            //find the closes parent that contains a 'li'
            .closest($(":not(a)").has("li"))
            //find the 'li's
            .find("li")
            //find any problematic tags (ie: figcaptions, svgs, img, a)
            .find($("figcaption, svg, img, a, label"))
            //remove problematic tags
            .remove()
            //return to results prior to what was removed (ie: 'li')
            .end()
            //for each 'li', if not in the array then push into array and remove leftover html
            .each(function () {
            var text = $(this).text().trim();
            if (!directions.includes(text) &&
                !ingredients.includes(text) &&
                text) {
                if (/^[0-9]/.test(text)) {
                    text = text.replace(/^[0-9]/, "");
                }
                directions.push(text.replace(/(<([^>]+)>)/gi, ""));
            }
        });
        //return variables in json
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
