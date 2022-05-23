var express = require('express');
var router = express.Router();

router = express.Router(),
{
  register,
  login,
  users,
  logout
} = require("../controllers/auth.controller.js");

router.post("/register", register, function (req, res) {
});

router.post("/login", login, function (req, res) {
});

router.get("/users", user, function (req, res) {
});

router.get("/logout", logout, function (req, res) {
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
