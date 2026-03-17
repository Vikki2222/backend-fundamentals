const usermodel = require('../models/user-model');
const { hashpassword, comparepassword } = require('../utils/pass_bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/generate_tokens');

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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        // Set cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, 
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, 
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        res.redirect("/");

module.exports = { generateAccessToken, generateRefreshToken };
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