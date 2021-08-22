const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


//creating schema
const userSchema = new mongoose.Schema ({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    work :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    cpassword :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    messages : [
       {
        message : {
            type : String,
        required : true
        }
       }
    ]
});

//securing password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});


// generting web tokemns

userSchema.methods.generateAuthTokens = async function(){
    const token = await jwt.sign({_id : this._id}, process.env.PRIVATE_KEY);

    this.tokens = this.tokens.concat({token});
    this.save()
    return token;
}


//for message in contact 

userSchema.methods.getMessage = async function(message){
this.messages = this.messages.concat({message});
await this.save();
return this.messages;
} 

//creating collection
const User = new mongoose.model("USER2", userSchema);

module.exports = User;