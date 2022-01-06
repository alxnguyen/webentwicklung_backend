var express=require('express');
var cors=require('cors');
const bp = require('body-parser');
const authService=require("./services/authService");

var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //bugfixing
  console.log(authService)
  //bugfixing
  const sessionId = await authService.login(email, password).then((sessionId)=> {
    if(!sessionId)  {
      return res.status(400).send("User Authentification failed");
    } else  {
      return res.status(201).send("User found");
    }
  });
});

app.listen(process.env.PORT ||3000);