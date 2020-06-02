const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Article.find(condition).then(articles => res.json(articles));
});

module.exports = router;