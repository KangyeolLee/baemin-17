var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/database");

/* GET home page. */
router.get("/", function (req, res, next) {
  const model = { title: "배민 - My배민" };
  
  if (req.session?.nickname) {
    model.nickname = req.session.nickname;
  }

  res.render("index", model);
});

router.get("/signup/agree", function (req, res, next) {
  res.render("agree");
});

router.get("/login", function (req, res, next) {
  const model = {};

  if (req.session?.loginError) {
    const loginError = req.session.loginError;
    delete req.session.loginError;
    model.error = loginError;
  }

  res.render("login", model);
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

  const hashedPassword = bcrypt.hashSync(password, 10);

  await db.insert({ email, password: hashedPassword, nickname });

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const foundUser = await db.find({ email });
  if (foundUser.length && await bcrypt.compare(password, foundUser[0].password)) {
    req.session.nickname = foundUser[0].nickname;
    res.redirect('/');
  } else {
    req.session.loginError = '존재하지 않는 유저정보입니다.';
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res) {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
