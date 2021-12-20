const db = require("../knexSetup");

module.exports = {
    findUserByEmail
}

function findUserByEmail(email) {
    return db("users").where({email: email}).first();
}