var express=require('express');
var cors=require('cors');
const authService=require("./services/authService");
const dbHelpers = require("./models/dbHelpers");
const bp = require('body-parser');
var app=express();
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(cors({
  credentials: true, 
  origin: 'https://hungry-tereshkova-7ccef7.netlify.app'
}));

const checkLogin =async (req, res, next) =>{
  var cookie = req.cookies.session;
  if (!cookie) {
    return res.status(409).send("You need to be logged in to see this page." );
  }
  var email = await authService.getEmailForSession(cookie);
  if (!email) {
    return res.status(409).send("You need to be logged in to see this page.");
  }
  req.userEmail = email;

  next();
};


app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  sessionId=await authService.login(email, password);
  var cookie=req.cookies.session;
  if(sessionId==undefined)  {
    return res.status(400).send("User Authentification failed");
  }
  res.cookie("session", sessionId, {
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
    httpOnly: false,
    secure: true
  });
  return res.status(201).send("User found");
  
  
});
app.post("/register", async (req, res) =>   {
  var email=req.body.email;
  var password=req.body.password;
  try {
    var insertedId=await authService.register(email, password);
    console.log("insertedId="+insertedId);
    if (insertedId!=undefined)  {
      console.log("User wurde erstellt");
      return res.status(201).send("User created");
    } else  {
      return res.status(500).send("we messed up somehow");
    }
  } catch (e) {
    console.log(e);
    return res.status(409).send("User already exists");
  }
});

app.get("/edittrip", checkLogin, async (req, res) =>  { 
  trips=await dbHelpers.readTrips(req.userEmail);
  tripJson=JSON.stringify(trips);
  return res.status(201).end(tripJson);
});

app.post("/edittrip", checkLogin, async (req, res) => {
  var tripname = req.body.tripname;
  var land = req.body.land;
  var start = req.body.start;
  var ende = req.body.end;
  var date = req.body.date;
  var mail = req.userEmail;
  savedTripname=await dbHelpers.createTrip(mail, tripname, land, start ,ende, date,)
  if(savedTripname!=undefined&&savedTripname==tripname) {
    return res.status(201).send("Trip wurde erstellt");
  } else return res.status(500).send("irgendetwas ist schiefgelaufen");
});

app.patch("/edittrip/:tripID", checkLogin, async (req, res) =>  {

  var tripname = req.body.tripname;
  var land = req.body.land;
  var start = req.body.start;
  var ende = req.body.end;
  var mail = req.userEmail;
  var id=req.params.tripID;
  var tripBelongs=await dbHelpers.tripBelongsToUser(id, mail);
  if(tripBelongs) {
    tripUpdated=await dbHelpers.updateTrip(id, tripname, land, start, ende);
    if(tripUpdated) {
      return res.status(200).send("Trip wurde geupdated");
    } else return res.status(400).send("konnte nicht geupdated werden (evtl gar nicht da)");
  } else return res.status(409).send("User hat keinen Zugriff auf diese ID");
});

app.get("/map", checkLogin, async (req, res) => {
  mail=req.userEmail;
  countries=await dbHelpers.readCountries(mail);
  return res.status(201).end(JSON.stringify(countries));
})

app.get("/verify", async (req, res) => {
  console.log("an attempt was made");
  var userID=req.params.userID;
  var token=req.params.token;

  userVerified=authService.verifyUser(userID, token);
  if(userVerified)  {
    return res.status(200).send("User wurde verifiziert");
  } else return res.status(409).send("etwas ist schiefgelaufen");
});

app.delete("/edittrip/:tripID", checkLogin, async (req, res) =>  {
  var id=req.params.tripID;
  var tripBelongs=await dbHelpers.tripBelongsToUser(id, req.userEmail);
  if(tripBelongs) {
    gotDeleted=await dbHelpers.deleteTrip(id);
    if(gotDeleted==1)  {
      return res.status(200).send("Trip wurde geloescht");
    } else return res.status(400).send("konnte nicht geloescht werden (evtl gar nicht da)");
  } else return res.status(409).send("User hat keinen Zugriff auf diese ID");
});


app.listen(process.env.PORT ||3000);