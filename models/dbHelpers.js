const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    createUser
}

async function createUser(newEmail, hashedPassword)  {
    user=await db("users").insert({
        email:newEmail,
        password:hashedPassword
    });
    return user
}

async function findUserByEmail(email) {
    user=await db("users").where({email}).first();
    return user;
}