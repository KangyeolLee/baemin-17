var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/agree", function (req, res, next) {
  res.render("agree");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

module.exports = router;
