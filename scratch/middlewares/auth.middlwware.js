const jwt = require('jasonwebtoken');

const protectedroute= (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send("Access denied , no token provided");
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_key)
        req.user= decode
        next();
    }
    catch(err){
        res.status(401).send("token expired")
    }
}

module.exports = {protectedroute};