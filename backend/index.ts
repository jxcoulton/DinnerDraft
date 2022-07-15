const express = require("express");
const cors = require("cors");
const recipe = require("./routes/recipe");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/recipe", recipe);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export = {};
