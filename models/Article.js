const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: Array,
        required: true
    },
    journal: {
        type: String,
        required: true
    }
});

module.exports = Article = mongoose.model('Article', ArticleSchema);