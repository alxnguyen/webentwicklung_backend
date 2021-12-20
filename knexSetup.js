dbEnv=process.env.DB_ENV||"development";
const config=require("./knexfile")[dbEnv];
module.exports=require("knex")(config);