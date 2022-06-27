const express = require("express");
const cors = require("cors");
const recipe = require("./routes/recipe");

const app = express();

app.use(cors());

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "dinner-draft.vercel.app/");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
});

app.use(express.json());

app.use("/recipe", recipe);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export = {};
