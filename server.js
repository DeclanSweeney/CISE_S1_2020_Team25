const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

const articles = require("./routes/api/articles");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

var db;
//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  db = process.env.MONGO_URI_PROD;
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else if (process.env.NODE_ENV === "development") {
  db = process.env.MONGO_URI_UAT;
} else {  
  db = process.env.MONGO_URI_UAT;
}

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//User Routes
app.use("/api/articles", articles);

//Connect to port 5000 unless deployed
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = {app};
