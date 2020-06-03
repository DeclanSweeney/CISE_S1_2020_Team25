const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  journal: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = Article = mongoose.model("Article", ArticleSchema);
