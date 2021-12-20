const db = require("../knexSetup");

module.exports = {
    findUserByEmail
}

function findUserByEmail(email) {
    return db.select("email","password").from("users").where({email: email}).first();
}