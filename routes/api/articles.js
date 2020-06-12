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
