const Users = require("../models/dbHelpers");
const crypto=require("crypto")

module.exports = {
    checkPassword,
    login
}
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
      return sessionId;
    } else  {
      return undefined;
    }
  }