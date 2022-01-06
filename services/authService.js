const Users = require("../models/dbHelpers");

module.exports = {
    checkPassword,
    login
}
async function checkPassword(email, password)   {
    console.log("checkpassword wird aufgerufen")
    const user= await Users.findUserByEmail(email)
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
  }

  async function login(email, password)    {
    correctPassword=await checkPassword(email, password);
    if(correctPassword) {
      console.log("erstelle sessionId");
      const sessionId=crypto.randomUUID();
      return sessionId;
    } else  {
      console.log("wtf");
      return undefined;
    }
  }