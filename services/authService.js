const Users = require("../models/dbHelpers");
const crypto = require("crypto");
const redis = require('redis');
const { env } = require("process");
const bcrypt = require("bcrypt");

module.exports = {
    checkPassword,
    login
}

const client = redis.createClient({
    url:process.env.REDIS_URL
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Successfully connected to redis"));

(async () => {
    await client.connect();
  })();


  async function checkPassword(email, password)   {
    const user= await Users.findUserByEmail(email)
    if(!user)   {
        console.log("User existiert nicht");
        return false;
    } else  {
      bcrypt.compare(password, user.password, async function(err, res) {
        if(res) {
          passwordHash=await bcrypt.hash(password, 10);
          console.log("funktioniert eig. alles: "+passwordHash )
          return true;
        } else {
          passwordString="falsches Passwort: "+password+ "   " + await bcrypt.hash(password, 10)+ "    " + user.password
          console.log(passwordString);
          return false;
        }
      });
    }
  }


  async function login(email, password)    {
    correctPassword=await checkPassword(email, password);
    if(correctPassword) {
      console.log("hallohallohallo");
      const sessionId=crypto.randomUUID();
      await client.set(sessionId, email, { EX: 60 });
      return sessionId;
    } else  {
      return undefined;

    }
  }