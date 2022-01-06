var express=require('express');
var cors=require('cors');
const authService=require("./services/authService")
const bp = require('body-parser');
var app=express();
const crypto=require("crypto")
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  sessionId=await authService.login(email, password);
  console.log("loginfunktion durch");
  if(!sessionId)  {
    console.log("fierhundat");
    return res.status(400).send("User Authentification failed");
  } else  {
    console.log("zweihundateins");
    return res.status(201).send("User found");
  }
});

app.listen(process.env.PORT ||3000);