const express = require("express");
const router = express.Router();

const Article = require("../../models/Article");

//@route GET api/items
//@desc Get All Items
//@access Public
router.get("/", (req, res) => {
  var obj = req.query;
  var conditions = {};
  for (var key of Object.keys(obj)) {
    var stringified = JSON.stringify(obj);

    const regex = new RegExp(JSON.parse(stringified)[key].slice(1, -1));

    var val = obj[key];
    if ((val[0] == '/') && (val[val.length - 1] == '/')) {
      conditions[key] = regex;
    } else {
      conditions[key] = val;
    }
  }

  if (conditions.year != null) {
    conditions.year = JSON.parse(conditions.year);
  }
  Article.find(conditions).then((articles) => res.json(articles));
});

//@route GET api/items
//@desc Get All Items
//@access Public
router.post("/", (req, res) => {
  const {
    title,
    author,
    journal,
    month,
    year,
    volume,
    number,
    pages,
  } = req.body;

  const article = new Article({
    title,
    author,
    journal,
    month,
    year,
    volume,
    number,
    pages,
  });

  article.save().then((item) => res.json(item));
});

module.exports = router;
