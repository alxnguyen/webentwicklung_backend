const Users = require("../models/dbHelpers");
const crypto = require("crypto");
const redis = require('redis');
const { env } = require("process");

module.exports = {
    checkPassword,
    login
}

const client = redis.createClient({
    url:process.env.REDIS_URL
});
console.log(process.env.REDIS_URL);
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Successfully connected to redis"));

(async () => {
    await client.connect();
  })();


async function checkPassword(email, password)   {
    const user= await Users.findUserByEmail(email)
    if(!user)   {
      return false;
    } else  {
      if(password==user.password) {
        return true;
      } else  {
        return false;
      }
    }
  }

  async function login(email, password)    {
    correctPassword=await checkPassword(email, password);
    if(correctPassword) {
      const sessionId=crypto.randomUUID();
      await client.set(sessionId, email, { EX: 60 });
      return sessionId;
    } else  {
      return undefined;
    }
  }