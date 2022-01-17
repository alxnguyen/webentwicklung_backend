const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    createUser
}

async function createUser(newEmail, hashedPassword)  {
    db("users").insert({
        email:newEmail,
        password:hashedPassword
    }).returning("email")
    .then(function (email)  {
        return email;
    })
}

async function findUserByEmail(email) {
    user=await db("users").where({email}).first();
    return user;
}