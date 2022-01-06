var express=require('express');
var cors=require('cors');
const bp = require('body-parser');

var app=express();
app.use(cors());
app.use(express.json());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.post("/", async (req, res) => {
    async function checkPassword(email, password)   {
      const user= Users.findUserByEmail(email).then((user) => {
          if(!user)   {
              return false;
         } else  {
             if(password==user.password) {
                  return true;
              } else  {
                  return false;
             }
         }
      });
  }

  async function login(email, password)    {
     const correctPassword=await checkPassword(email, password);
      if(correctPassword) {
          const sessionId=crypto.randomUUID();
         return sessionId;
      }
     return undefined
  }

  const email = req.body.email;
  const password = req.body.password;
  const sessionId = await login(email, password).then((sessionId)=> {
    if(!sessionId)  {
      return res.status(400).send("User Authentification failed");
    } else  {
      return res.status(201).send("User found");
    }
  });
});

app.listen(process.env.PORT ||3000);