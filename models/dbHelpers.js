const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    createUser,
    createTrip,
    readTrips,
    deleteTrip,
    updateTrip,
    readCountries,
    tripBelongsToUser
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
async function tripBelongsToUser(tripId, userMail)  {

    tripBelongs=await db("trips").where({email:userMail, id:tripId});
    return tripBelongs;
}

async function readTrips(mail) {
    trips=await db("trips").where({email:mail}).returning(["tripname", "land", "start", "ende", "date"]);
    return trips;
}

async function readCountries(mail)  {
    countries=await db("trips").where({email:mail}).returning("land");
    newCountryList=[];
    countries=await countries.forEach(element => {
        if(!newCountryList.includes(element.land))  {
            newCountryList.push(element.land);
        }
    });
    return newCountryList;
}
async function updateTrip(tripID, tripname, land, start, ende)  {
    tripUpdated=await db("trips").where({id:tripID}).update({tripname:tripname, land:land, start:start, end:ende});
    return tripUpdated;
}
async function deleteTrip(tripId)   {
    success=await db("trips").where({id:tripId}).delete();
    return success;
}

async function createTrip(email, tripname, land, start, ende, created)  {
    new_trip=await db("trips").insert({
        email:email,
        tripname:tripname,
        land:land,
        start:start,
        end:ende,
        created:created
    }).returning("tripname");
    return new_trip;
}