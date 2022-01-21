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
    console.log("kein cookie da: "+cookie);
    return res.status(409).send("You need to be logged in to see this page." );
  }
  var email = await authService.getEmailForSession(cookie);
  console.log("email des Dudes: "+email);
  if (!email) {
    console.log("keine Email bekommen. Cookie: "+cookie+" Mail: "+email);
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
  if(!sessionId)  {
    return res.status(400).send("User Authentification failed");
  }
  console.log("cookie wird erstellt mit sessionnummer "+ sessionId);
  res.cookie("session", sessionId, {
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
    httpOnly: false,
    secure: true
  });
  return res.status(201).send("User found");
  
  
});
app.post("/register", async (req, res) =>   {
  console.log("request ist angekommen");
  var email=req.body.email;
  var password=req.body.password;
  try {
    var createdMail=await authService.register(email, password);
    if (createdMail==email)  {
      console.log("User wurde erstellt");
      return res.status(201).send("User created");
    } else  {
      console.log("irgendwas ist schiefgelaufen "+ createdMail);
      return res.status(500).send("we messed up somehow");
    }
  } catch (UnhandledPromiseRejectionWarning) {
    return res.status(409).send("User already exists");
  }
});

app.get("/edittrip", checkLogin, async (req, res) =>  { 
  trips=await dbHelpers.readTrips(req.userEmail);
  tripJson=JSON.stringify(trips);
  console.log("trips"+tripJson);
  return res.status(201).end(tripJson);
});

app.post("/edittrip", checkLogin, async (req, res) => {
  var tripname = req.body.tripname;
  var land = req.body.land;
  var start = req.body.start;
  var ende = req.body.end;
  var date = req.body.date;
  var mail = req.userEmail;

  console.log("tripname: "+tripname);
  console.log("land: "+land);
  console.log("start: "+start);
  console.log("ende: "+ende);
  console.log("date: "+date);
  console.log("mail: "+mail);
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
  var tripBelongs=dbHelpers.tripBelongsToUser(id, mail);
  if(tripBelongs) {
    tripUpdated=dbHelpers.updateTrip(id, tripname, land, start, ende);
    if(tripUpdated) {
      return res.status(200).send("Trip wurde geupdated");
    } else return res.status(500).send("irgendetwas ist schiefgelaufen");
  } else return res.status(409).send("User hat keinen Zugriff auf diese ID");
});


app.delete("/edittrip/:tripID", checkLogin, async (req, res) =>  {
  var id=req.params.tripID;
  var tripBelongs=dbHelpers.tripBelongsToUser(id, req.userEmail);
  if(tripBelongs) {
    gotDeleted=dbHelpers.deleteTrip(id);
    if(gotDeleted)  {
      return res.status(200).send("Trip wurde geloescht");
    } else return res.status(500).send("irgendetwas ist beim loeschen schief gelaufen");
  } else return res.status(409).send("User hat keinen Zugriff auf diese ID");
});


app.listen(process.env.PORT ||3000);