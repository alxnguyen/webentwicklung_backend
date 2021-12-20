dbEnv=process.env.DATABASE_ENV||"development";
const config=require("./knexfile")[dbEnv];
module.exports=require("knex")(config);