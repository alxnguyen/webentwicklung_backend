var express=require('express');
var cors=require('cors');
const authService=require("./services/authService");
const bp = require('body-parser');
var app=express();
const cookieParser=require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy',1)



app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  sessionId=await authService.login(email, password);
  if(!sessionId)  {
    return res.status(400).send("User Authentification failed");
  }
  res.cookie("session", sessionId, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production"
  });
  return res.status(201).send("User found");
});

app.listen(process.env.PORT ||3000);