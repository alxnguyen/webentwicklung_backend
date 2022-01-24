const knexfile = require("../knexfile");
const db = require("../knexSetup");

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    createTrip,
    readTrips,
    deleteTrip,
    updateTrip,
    readCountries,
    tripBelongsToUser,
    activateUser,
    findUserById
}

async function createUser(newEmail, hashedPassword, token)  {
    id=await db("users").insert({
        email:newEmail,
        password:hashedPassword,
        token:token,
        active:false
    }).returning("id");
    return id;
}

async function activateUser(id) {
    userUpdated=await db("users").where({id:id}).update({active:true});
    console.log("userUpdated="+userUpdated);
    console.log("userUpdatedJSON="+JSON.stringify(userUpdated));
    return userUpdated;
}

async function findUserById(id) {
    user=await db("users").where({id:id}).first();
    return user;
}
async function findUserByEmail(email) {
    user=await db("users").where({email:email}).first();
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