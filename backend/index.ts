const PORT = 8000;

const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// const url = "https://tasteofhome.com/recipes/sour-cream-chocolate-cookies/";

app.post("/", function (req: any, res: any) {
  axios(req.body.url)
    .then((response: any) => {
      const html = response.data;
      const $ = cheerio.load(html);
      let ingredients: string[] = [];
      let directions: string[] = [];
      let title: string = "";

      $("h1").each(function (this: any) {
        const text = $(this).html().trim();
        title = text;
      });

      $("div")
        .find($('[class*="ingredient"] li'))
        .each(function (this: any) {
          const text = $(this).text().trim();
          ingredients.push(text);
        });

      $("div")
        .find(
          $(
            '[class*="direction"] li, [class*="instruction"] li, [class*="step"] li'
          )
        )
        .each(function (this: any) {
          const text = $(this).text().trim();
          directions.push(text);
        });

      res.json({
        recipe: {
          title,
          ingredients,
          directions,
          url: req.body.url,
        },
      });
    })
    .catch((err: any) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
