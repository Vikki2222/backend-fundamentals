const usermodel = require('../models/user-model');
const { hashpassword, comparepassword } = require('../utils/pass_bcrypt');
const { generateTokens } = require('../utils/generate_tokens');

// --------------------- SIGN UP ---------------------
const sign_up = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "This email already exists" });
        }

        const hashedpassword = await hashpassword(password);

        const user = await usermodel.create({
            fullname,
            email,
            password: hashedpassword
        });

        // Usually we redirect to sign_in after signup
        return res.redirect("/users/sign_in");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --------------------- SIGN IN ---------------------
const sign_in = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const ComparepassW = await comparepassword(password, user.password);
        if (!ComparepassW) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = generateTokens(user);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",   // ✅ allows POST -> redirect
            secure: false,     // ✅ localhost, set true in production
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.redirect("/"); // protected route

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --------------------- LOGOUT ---------------------
const logout = (req, res) => {
    res.clearCookie("token");
    return res.redirect("/users/sign_in");
};

module.exports = {
    sign_up,
    sign_in,
    logout
};