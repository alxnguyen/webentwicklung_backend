var express=require('express');
var cors=require('cors');
const bp = require('body-parser');
const Users = require("./models/dbHelpers");
var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.post("/", async (req, res) => {
  async function checkPassword(email, password)   {
    const user= Users.findUserByEmail(email).then((user) => {
      if(!user)   {
        console.log("user existiert nicht");
        return false;
      } else  {
          if(password==user.password) {
            console.log("user und passwort existieren");
            return true;
          } else  {
            console.log("User existiert, passwort nicht");
            return false;
          }
      }
    });
  }

  async function login(email, password)    {
    correctPassword=await checkPassword(email, password);
    if(correctPassword) {
      console.log("erstelle sessionId");
      const sessionId=crypto.randomUUID();
      return sessionId;
    } else  {
      console.log("wtf");
      return undefined
    }
  }

  const email = req.body.email;
  const password = req.body.password;
  sessionId=await login(email, password)
  if(!sessionId)  {
    return res.status(400).send("User Authentification failed");
  } else  {
    return res.status(201).send("User found");
  }
});

app.listen(process.env.PORT ||3000);