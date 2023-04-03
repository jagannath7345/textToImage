const express = require("express");
const bodyparser = require("body-parser");
const textToImage = require("text-to-image");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { dataUri: "" });
});

app.post("/generateImage", (req, res) => {
  let text = req.body.text;
  let bcolor = req.body.bcolor;
  let align = req.body.align;
  let tcolor = req.body.tcolor;
  let fontsize = req.body.fontsize;

  textToImage
    .generate(text, {
      bgColor: bcolor,
      textColor: tcolor,
      textAlign: align,
      fontSize: fontsize,
      customHeight: 200,
      fontFamily: "cursive",
      verticalAlign: "center"
    })
    .then((dataUri) => {
      console.log(dataUri);
      res.render("index", { dataUri: dataUri });
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
