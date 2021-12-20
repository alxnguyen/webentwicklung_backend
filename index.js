var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");

var app=express();
app.use(cors())

app.get("/", (req, res) => {
    console.log(req.params);
    const {email} = req.params;
    Users.findUserByEmail(email)
    .then((user) => {
        res.status(200);
    })
    .catch((error) => {
        res.status(500);
    });
});

app.listen(process.env.PORT ||3000);