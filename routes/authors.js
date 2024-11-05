const express = require("express");
const router = express.Router();
const Author = require("../models/author.js");

// here all authors list display agurathuku
router.get("/", (req, res) => {
  res.render("authors/index");
});

// Get new author vangurathuku
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Post new author create pandrathuku
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    await author.save(); // save new author to database
    res.redirect("/authors"); // back to author page
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    }); // error throw pandrathuku
  }
});

module.exports = router;
