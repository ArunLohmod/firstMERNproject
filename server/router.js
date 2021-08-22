const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("./middlewares/authenticate");


const cookieParser = require('cookie-parser');
router.use(cookieParser());

//for conn.js
require("./db/conn");

//for userSchema
const User = require("./models/userSchema");
const { json } = require('body-parser');

router.get('/', (req, res)=>{
    res.send('hi there')
});

// router.get("/about", (req, res)=>{
//     res.send("this is about page.")
// })


router.post('/signup', async(req, res)=>{

    console.log(req.body);
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        res.json({error : "fill all the fields properly"})
    };

   try {
       
    const verifyEmail = await User.findOne({email});

    if(verifyEmail){
        res.json({error : "email is already registered"})
    }else if(password != cpassword){
     res.json({error : "password and c password are not maching"})
    }
    else{
        const user = new User({name, email, phone, work, password, cpassword})
        await user.save()
 
        res.status(201).json({message : "user registered succesfully"})
    }

   } catch (error) {
       res.json({error:error})
   }

});


router.post("/login", async(req, res)=>{
console.log(req.body);
const {email, password} = req.body;

if (!email || !password){
    res.json("fill all fields completely")
}

try {
    
const user = await User.findOne({email});

if(user){

   const passwordMatch = await bcrypt.compare(password, user.password);

if(!passwordMatch){
        res.json({error : 'invalid credientials'})
}else{

    
    //generating tokens
    const token = await user.generateAuthTokens();

    //cookies

    res.cookie("jwtoken", token, {
        httpOnly : true
    });

    res.status(200).json({message : "logged in succesful"});
    console.log(`welcome ${user.name}`);


}
}
else{
    res.json({error : 'invalid credientials'})
}

} catch (error) {
    console.log(error)
}

});


// about ka page

router.get("/about", authenticate, (req, res)=>{
    res.send(req.rootUser); 
});

// home page and contact page

router.get("/getData", authenticate, (req, res)=>{
    res.send(req.rootUser); 
});

// for contact page

router.post('/contact', authenticate, async(req, res)=>{

    
try {
    const message = req.body;
    console.log(message)


    if(!message){
        res.json({error : "fill all fields"});
    }
    
    const verifyUser = await User.findOne({_id : req.userId});
    
    if(verifyUser = true){
         await verifyUser.getMessage(message);
         console.log('i am verifyUser')
    }

} catch (error) {
    res.json({error})
}

});


// for logout page

router.get('/logout', (req, res)=>{
    res.clearCookie('jwtoken');
    res.status(200).send('user logged out sucessfully')
})

module.exports = router;


