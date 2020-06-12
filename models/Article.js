const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
  },
  number: {
    type: Number,
  },
  pages: {
    type: String,
  },
});

module.exports = Article = mongoose.model("Article", ArticleSchema);
