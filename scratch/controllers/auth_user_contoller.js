const usermodel = require('../models/user-model');
const { hashpassword, comparepassword } = require('../utils/pass_bcrypt');
const { generateTokens } = require('../utils/generate_tokens');

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

        const token = generateTokens(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Signup successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const sign_in = async (req, res) => {
    try {
        const {email,password} = req.body

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        };
        const ComparepassW = await comparepassword(password,user.password)
        if (!ComparepassW)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateTokens(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Signup successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    };

}

module.exports = { sign_up,
    sign_in
 };
