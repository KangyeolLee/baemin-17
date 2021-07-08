var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "배민 - My배민" });
});

router.get("/signup/agree", function (req, res, next) {
  res.render("agree");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get('/signup/phone', function (req, res, next) {
  res.render('signup-phone', { title: '배민 - 전화번호 인증'})
});

router.get("/signup/detail", function (req, res, next) {
  res.render("signup-detail");
});

module.exports = router;
