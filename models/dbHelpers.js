const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    findAllUsers
}

function findUserByEmail(email) {
    return db("users").where({email: email}).first().then(data => console.log(data));
}

function findAllUsers() {
    return db("users");
}