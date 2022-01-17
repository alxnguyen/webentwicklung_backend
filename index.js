var express=require('express');
var cors=require('cors');
const authService=require("./services/authService");
const bp = require('body-parser');
var app=express();
const cookieParser=require("cookie-parser");
app.use(cors());
app.use(cors({credentials: true, origin: 'https://hungry-tereshkova-7ccef7.netlify.app'}));
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
      sameSite: "none",
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
app.post("/register", async (req, res) =>   {
  console.log("request ist angekommen");
  var email=req.body.email;
  var password=req.body.password;
  var createdUser=await authService.register(email, password);
  if (createdUser==email)  {
    console.log("User wurde erstellt");
    return res.status(201).send("User created");
  } else  {
    console.log("irgendwas ist schiefgelaufen "+ createdUser);
    return res.status(500).send("we fucked up somehow");
  }
})
app.listen(process.env.PORT ||3000);