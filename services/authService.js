const Users = require("./models/dbHelpers");

class AuthService   {
    async checkPassword(email, password)   {
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
    async login(email, password)    {
        const correctPassword=await this.checkPassword(email, password);
        if(correctPassword) {
            const sessionId=crypto.randomUUID();
            return sessionId;
        }
        return undefined
    }
}