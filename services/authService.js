const dbHelpers = require("../models/dbHelpers");
const crypto = require("crypto");
const redis = require('redis');
const { env, getMaxListeners } = require("process");
const bcrypt = require("bcrypt");
const mailingService = require("./mailingService.js");

module.exports = {
    getEmailForSession,
    checkPassword,
    login,
    register,
    verifyUser

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
    const user= await dbHelpers.findUserByEmail(email);
    if(!user)   {
        return false;
    } else  {
      res=await bcrypt.compare(password, user.password);
        if(res) {
          return true;
        } else {
          return false;
        }
    }
  }


  async function register(email, password, token)  {
    var hashedPassword=await bcrypt.hash(password, 10);
    var token = uuid.v4();
    var insertedId=await dbHelpers.createUser(email, hashedPassword, token);
    await mailingService.sendOptInMail(email,id ,token);
    return insertedId;
  }

  async function login(email, password)    {
    correctPassword=await checkPassword(email, password);
    user=await dbHelpers.findUserByEmail(email);
    isActive=user.active;
    console.log("isActive="+isActive);
    console.log("isActiveJSON="+JSON.stringify(isActive));
    if(correctPassword&&isActive) {
      const sessionId=crypto.randomUUID();
      await client.set(sessionId, email, { EX: 60*60*1000 });
      return sessionId;
    } else  {
      return undefined;
    }
  }

  async function verifyUser(id, token)  {
    user=dbHelpers.findUserById(id);
    if(user.token=token)  {
      userUpdated=dbHelpers.activateUser(id);
      if(userUpdated) {
        return true;
      }
    }
    return false;
  }

  async function getEmailForSession(sessionId)  {
    email=await client.get(sessionId);
    return email;
  }



