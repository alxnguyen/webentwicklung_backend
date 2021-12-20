var express=require('express');
var cors=require('cors');
const Users = require("./models/dbHelpers");

var app=express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    Users.findAllUsers()
      .then((user) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ message: "unable to retrieve users" });
      });
  });

app.post("/", async (req, res) => {
    const user = await Users.findUserByEmail(req.body.email);
    console.log(user);
    if(!user) {
        return res.status(400).send("Cannot find user");
    } else {
        return res.status(201).send("User found");
    }
});

app.listen(process.env.PORT ||3000);