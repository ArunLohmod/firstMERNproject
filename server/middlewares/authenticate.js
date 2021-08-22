const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');

const Authenticate = async(req, res, next) =>{
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = await jwt.verify(token, process.env.PRIVATE_KEY);

        const rootUser = await User.findOne({_id : verifyToken._id,  "tokens.token" : token});

        if(!rootUser){
            throw new Error("user not found!")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

     } catch (error) {
        res.status(401).send("Unauthorised : No token found!")
       console.log(error) 
     }
}

module.exports = Authenticate;