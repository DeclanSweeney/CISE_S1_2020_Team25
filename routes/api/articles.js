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
    if (regex[0] === "\"") {
      conditions[key] = regex;
    } else {
      conditions[key] = obj[key];
    }
  }

  Article.find(conditions).then((articles) => res.json(articles));
});

//@route GET api/items
//@desc Get All Items
//@access Public
router.post("/", (req, res) => {
  const { title, author, journal, month, year } = req.body;

  const article = new Article({
    title,
    author,
    journal,
    month,
    year
  });

  article.save().then(item => res.json(item));
});

module.exports = router;
