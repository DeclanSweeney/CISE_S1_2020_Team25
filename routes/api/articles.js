const express = require("express");
const router = express.Router();

const Article = require("../../models/Article");

//@route GET api/items
//@desc Get All Items
//@access Public
router.get("/", (req, res) => {
  const title = req.query.title;
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;

  var conditions = new Object();
  if (title) {
    conditions.title = { $regex: new RegExp(title), $options: "i" };
  }
  if (dateFrom && dateTo) {
    conditions.date = { $gte: new Date(dateFrom), $lt: new Date(dateTo) };
  }

  Article.find(conditions).then((articles) => res.json(articles));
});

//@route GET api/items
//@desc Get All Items
//@access Public
router.post("/", (req, res) => {
  const article = new Article({
    title: req.body.title,
    authors: req.body.authors,
    journal: req.body.journal,
    date: req.body.date
  })

  article.save().then(item => res.json(item));
});

module.exports = router;
