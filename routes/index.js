var express = require("express");
var router = express.Router();
const bycrypt = require("bcrypt");
const db = require("../db/database");

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

router.get("/signup/phone", function (req, res, next) {
  res.render("signup-phone", { title: "배민 - 전화번호 인증" });
});

router.get("/signup/detail", function (req, res, next) {
  const signupError = req.session?.signupError;
  if (signupError) {
    delete req.session.signupError;
    res.render("signup-detail", { error: signupError });
    return;
  }

  res.render("signup-detail");
});

router.post("/signup", async function (req, res, next) {
  const { email, password, nickname } = req.body;

  const foundUser = await db.find({ email });

  if (foundUser.length) {
    req.session.signupError = "이미 사용중인 이메일입니다!";
    res.redirect("/signup/detail");
    return;
  }

  const hashedPassword = bycrypt.hashSync(password, 10);

  await db.insert({ email, password: hashedPassword, nickname });

  res.redirect("/login");
});

module.exports = router;
