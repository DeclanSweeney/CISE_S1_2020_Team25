const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

const MONGO_URI_PROD = "mongodb+srv://declan:declan123@mern-seer-poe68.mongodb.net/seer?retryWrites=true&w=majority";
const MONGO_URI_UAT = "mongodb+srv://declan:declan123@mern-seer-poe68.mongodb.net/test?retryWrites=true&w=majority";

const articles = require("./routes/api/articles");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  db = MONGO_URI_PROD;
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log("Else");
  db = MONGO_URI_UAT;
  console.log("DB: " + db);
}

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error(err));

//User Routes
app.use("/api/articles", articles);

//Connect to port 5000 unless deployed
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = {app};
