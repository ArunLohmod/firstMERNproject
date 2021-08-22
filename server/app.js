const express = require('express');
const app = express();

// for dotenv file
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});

const port = process.env.PORT;

//for conn.js
// require("./db/conn");

app.use(express.json());

//for userSchema
const User = require("./models/userSchema");


//for router
const router = require('./router');
app.use(router);



app.listen(port, ()=>{
    console.log(`your req is listning at port number ${port}`);
});

