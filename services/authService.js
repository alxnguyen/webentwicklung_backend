const Users = require("../models/dbHelpers");
const crypto = require("crypto");
const redis = require('redis');

module.exports = {
    checkPassword,
    login
}

const client = redis.createClient("redis://:pd2bb84d1ffdbd843bc36be14218bb2e7100f3a3f28e9a89579ff4a8be17270f0@ec2-44-193-172-66.compute-1.amazonaws.com:20639");
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