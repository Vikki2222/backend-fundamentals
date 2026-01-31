const express = require('express');
const router = express.Router();
const Usermodel = require("../models/user-model")
const {sign_up,sign_in} = require('../controllers/auth_user_contoller')


router.get("/", function (req, res) {
    res.send("heyyy idkkk")
});

router.post("/register", async (req, res) => {
    
    try {
        let { fullname, email, password } = req.body;

        let existingUser = await Usermodel.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        let createdUser = await Usermodel.create({
            fullname,
            email,
            password,
        });

        return res.send(createdUser);

    } catch (err) {
        return res.send(err.message);
    }
});

router.post ("/sign_up",sign_up);
router.post ("/sign_in",sign_in);


module.exports = router;