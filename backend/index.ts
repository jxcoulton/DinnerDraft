const PORT = 8000;

const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

// const url = "https://tasteofhome.com/recipes/sour-cream-chocolate-cookies/";


app.post("/", function (req: any, res: any) {
  axios(req.body.url)
    .then((response: any) => {
      const html = response.data;
      const $ = cheerio.load(html);
      let ingredients: string[] = [];
      let directions: string[] = [];
      let title: string = "";

      $("ul, ol")
        .find('[class*="ingredient"] li')
        .each(function (this: any) {
          const text = $(this).text();
          ingredients.push(text.trim());
        });

      $("h1").each(function (this: any) {
        const text = $(this).text();
        title = text;
      });

      $("ul, ol")
        .filter(function (this: any) {
          return (
            $('[class*="direction"]', this).length ||
            $('[class*="instruction"]', this).length
          );
        })
        .each(function (this: any) {
          $(this.children).each(function (this: any) {
            directions.push($(this).text().trim());
          });
        });
      res.json({
        recipe: {
          title,
          ingredients,
          directions
        }})
    })
    .catch((err: any) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
