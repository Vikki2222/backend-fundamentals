const Usermodel = require('../models/user-model');
const { hashpassword, comparepassword } = require('../utils/pass_bcrypt');
const{generateTokens} = require('../utils/generate_tokens')
const { protectedroute } = require('../middlewares/auth.middlwware');


const sign_up = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const ifemail = await Usermodel.find({ email: email });
        if (!ifemail > 0) {
            req.flash("message", "this email already exists");
            res.redirect('/');
        }
        const hashedpassword = await hashpassword(password)
        let user = await Usermodel.create({
            fullname,
            email,
            password : hashedpassword
        })

        const token = await generateTokens(user)
        res.cookie("token",token)
        req.flash("message" , "Account created, you can login now");
    res.redirect("/");

    }
    catch (err) {
        res.send(err.message);
      }
};

module.exports={
    sign_up
}




