var express = require("express");
var router = express.Router();
const { nanoid } = require("nanoid");

router.get("/", (req, res) => {
	res.sendFile("/views/index.html", { root: "./" });
});

router.get("/new", (req, res) => {
	res.redirect("/canvas/" + nanoid(5));
});

router.get("/canvas/:id", (req, res) => {
	res.sendFile("/views/canvas.html", { root: "./" });
});

router.get("/controller/:id", (req, res) => {
	res.sendFile("/views/controller.html", { root: "./" });
});

module.exports = router;
