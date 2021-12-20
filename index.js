var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");

var app=express();
app.use(cors())

app.post("/", (req, res) => {
    const user = Users.findUserByEmail(req.body);
    console.log(req.body);
    if(!user) {
        return res.status(400).send("Cannot find user");
    } else {
        return res.status(201).send("User found");
    }
});

app.listen(process.env.PORT ||3000);