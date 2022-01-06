var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");
const bp = require('body-parser');
const bcrypt = require("bcrypt");

var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    const user = Users.findUserByEmail(req.body.email).then((user) => {
        console.log(user);
        if(!user) {
            return res.status(400).send("Cannot find user");
        } else {
            bcrypt.compare(password, user.password, function(err, res) {
              if(res) {
                return res.status(201).send("User found");
              } else {
                return res.status(401).send("Wrong password");
              }
            });
        }
    }); 
});

app.listen(process.env.PORT ||3000);