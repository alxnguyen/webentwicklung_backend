var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");

var app=express();
app.use(cors())

app.use(express.urlencoded({extended: false}));

app.post("/", (req, res) => {
    const user = Users.findUserByEmail(req.body.email);
    console.log(user);
    if(!user) {
        return res.status(400).send("Cannot find user");
    } else {
        return res.status(201).send("User found");
    }
});

app.listen(process.env.PORT ||3000);