dbEnv=process.env.DB_ENVIRONMENT||"development";
const config=require("./knexfile")[dbEnv];
module.exports=require("knex")(config);