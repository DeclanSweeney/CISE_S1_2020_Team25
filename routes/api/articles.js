const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
    Article.find()
    .sort({ date: -1})
    .then(articles => res.json(articles));
});

module.exports = router;