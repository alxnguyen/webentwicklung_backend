const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    createUser,
    createTrip
}

async function createUser(newEmail, hashedPassword)  {
    mail=await db("users").insert({
        email:newEmail,
        password:hashedPassword
    }).returning("email");
    return mail;
}

async function findUserByEmail(email) {
    user=await db("users").where({email}).first();
    return user;
}

async function createTrip(user, tripname, land, start, ende, created)  {
    new_trip=await db("trips").insert({
        user:user,
        tripname:tripname,
        land:land,
        start:start,
        ende:ende,
        created:created
    }).returning("email");
    return new_trip;
}