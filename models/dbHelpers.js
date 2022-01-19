const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    createUser,
    createTrip,
    readTrips
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

async function readTrips(mail) {
    trips=await db("trips").where({email:mail}).returning(["tripname", "land", "start", "ende", "date"]);
    return trips;
}

async function createTrip(email, tripname, land, start, ende, created)  {
    new_trip=await db("trips").insert({
        email:email,
        tripname:tripname,
        land:land,
        start:start,
        ende:ende,
        created:created
    }).returning("tripname");
    return new_trip;
}