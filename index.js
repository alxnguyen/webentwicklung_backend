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
app.set('trust proxy', 1);



app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  sessionId=await authService.login(email, password);
  var cookie=req.cookies.session;
  if(!sessionId)  {
    return res.status(400).send("User Authentification failed");
  }
  if(cookie==undefined) {
    console.log("kein cookie da");
    console.log("cookie wird erstellt mit sessionnummer "+ sessionId);
    res.cookie("session", sessionId, {
      sameSite: true,
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
      secure: true
    });
    return res.status(201).send("User found");
  } else  {
    console.log("cookie da :)");
    return res.status(201).send("User found");
  }
  
});

app.listen(process.env.PORT ||3000);