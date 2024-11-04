if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");
const indexrouter = require("./routes/index.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expresslayouts);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/", indexrouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:3000/`);
});
