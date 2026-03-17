const jwt = require('jsonwebtoken');

const protectedroute = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Case 1: User never logged in
    if (!accessToken && !refreshToken) {
        return res.redirect("/users/sign_in");
    }

    // Case 2: Access token exists
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            req.user = decoded;
            return next(); // token valid, allow access
        } catch (err) {
            // If token expired, try refresh token
            if (!refreshToken) return res.redirect("/users/sign_in");
            return res.redirect("/users/refresh");
        }
    }

    // Case 3: No access token, but refresh token exists
    if (!accessToken && refreshToken) {
        return res.redirect("/users/refresh");
    }
};

module.exports = { protectedroute };

