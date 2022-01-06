const db = require("../knexSetup");

module.exports = {
    findUserByEmail
}

async function findUserByEmail(email) {
    user=await db("users").where({email}).first();
    return user;
}