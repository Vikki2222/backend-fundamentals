const express = require("express");
const router = express.Router();

const { sign_up, sign_in } = require("../controllers/auth_user_contoller");


router.get("/sign_in", (req, res) => {
    res.render("sign_in");
});

router.post("/sign_up", sign_up);

router.post("/sign_in", sign_in);

module.exports = router;