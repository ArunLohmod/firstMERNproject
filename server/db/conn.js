const mongoose = require("mongoose");

const DB = process.env.DB;

mongoose.connect(DB, {
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection sucessful")
}).catch((err)=>{
    console.log(err)
});