const express = require('express');
const router = express.Router();

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1})
    .then(articles => res.json(articles));
});

module.exports = router;