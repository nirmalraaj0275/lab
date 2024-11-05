if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");
const bodyparser = require("body-parser")

const indexrouter = require("./routes/index.js");
const Newrouter = require("./routes/authors.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expresslayouts);
app.use(bodyparser.urlencoded({limit:'10mb',extend:false}))

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/", indexrouter);
app.use("/authors", Newrouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:3000/`);
});
