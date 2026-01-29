const Usermodel = require('../models/user-model');
const { hashpassword, comparepassword } = require('../utils/pass_bcrypt');
const{generateTokens} = require('../utils/generate_tokens')
const { protectedroute } = require('../middlewares/auth.middlwware');



const sign_up = async (req, res) => {
    try {
        let {fullname, email, password } = req.body;
        const ifemail = await Usermodel.find({ email: email });
        if (ifemail.length > 0) {
            return res.status(400).json({ message: "This email already exists" });
        }
        const hashedpassword = await hashpassword(password)
        let user = await Usermodel.create({
            fullname,
            email,
            password : hashedpassword
        })

        const token = await generateTokens(user)
        res.cookie("token",token)
        return res.status(201).json({ message: user });

    }
    catch (err) {
        res.send(err.message);
      }
};

module.exports={
    sign_up
}




