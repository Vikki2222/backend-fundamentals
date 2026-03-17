const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "15m" } // short-lived
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "7d" } // long-lived
    );
};

module.exports = { generateAccessToken, generateRefreshToken };