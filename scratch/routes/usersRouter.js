const express = require('express');
const router = express.Router();
const Usermodel = require("../models/user-model")

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


module.exports = router;