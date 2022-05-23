var express = require('express');
var router = express.Router();

router = express.Router(),
{
  register,
  login
} = require("../controllers/auth.controller.js");

router.post("/register", register, function (req, res) {
});

router.post("/login", login, function (req, res) {
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
