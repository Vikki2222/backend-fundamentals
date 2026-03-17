const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // needed for refresh

const { sign_up, sign_in } = require("../controllers/auth_user_contoller");
const {generateAccessToken} = require("../utils/generate_tokens")

router.get("/sign_in", (req, res) => {
    res.render("sign_in");
});

router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.redirect("/users/sign_in");

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const newAccessToken = generateAccessToken({ _id: decoded.id });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 15 * 60 * 1000
        });

        res.redirect("/"); // continue to protected page
    } catch (err) {
        res.redirect("/users/sign_in");
    }
});

router.post("/sign_up", sign_up);

router.post("/sign_in", sign_in);

module.exports = router;