dbEnv="development";
const config=require("./knexfile")[dbEnv];
module.exports=require("knex")(config);