var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");
const bp = require('body-parser');
const authService=require("authService");

var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sessionId = await authService.login(email, password);
  if(!sessionId)  {
    return res.status(400).send("User Authentification failed");
  } else  {
    return res.status(201).send("User found");
  }
});

app.listen(process.env.PORT ||3000);