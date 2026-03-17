const jwt = require('jsonwebtoken');

const protectedroute= (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.redirect("/users/sign_in")
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_key)
        req.user= decode
        next();
    }
    catch(err){
        res.redirect("/users/sign_in")
    }
}

module.exports = {protectedroute};