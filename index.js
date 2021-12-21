var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");
const bp = require('body-parser');

var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    console.log(req.body);
    const user = Users.findUserByEmail(req.body.email);
    console.log(user);
    if(!user) {
        return res.status(400).send("Cannot find user");
    } else {
        return res.status(201).send("User found");
    }
});

app.listen(process.env.PORT ||3000);