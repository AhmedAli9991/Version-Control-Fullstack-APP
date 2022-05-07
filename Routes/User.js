var express = require("express");
var router = express.Router();
var auth = require("../Controler/auth");
var {getUser} = require("../Middleware/User")

router.route("/register").post(auth.Register);
router.route("/login").post(auth.Login);
router.route("/logout").post(getUser,auth.Logout);

module.exports = router;
