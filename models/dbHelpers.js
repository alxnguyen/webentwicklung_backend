const db = require("../knexSetup");

module.exports = {
    findUserByEmail
}

function findUserByEmail(email) {
    return select("email","password").from("users").where({email: email}).first();
}