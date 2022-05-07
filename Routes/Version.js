var express = require("express");
var router = express.Router();
var repos = require("../Controler/Versions");

router.route("/add").post(repos.Add);
router.route("/all/:id").get(repos.ViewAll);
router.route("/:id").get(repos.ViewOne);

module.exports = router;
