const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    findAllUsers
}

function findUserByEmail(email) {
    return db("users").where({email: email}).first();
}

function findAllUsers() {
    return db("users");
}