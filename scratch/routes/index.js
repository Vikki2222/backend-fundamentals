const express = require("express");
const router = express.Router();
const {protectedroute} = require("../middlewares/auth.middlwware")

router.get("/", protectedroute, (req, res) => {
    res.render("index");
});

module.exports = router;