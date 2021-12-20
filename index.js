var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");

var app=express();
app.use(cors())

app.get("/", (req, res) => {
    res.render("index.html");
});

app.listen(process.env.PORT ||3000);