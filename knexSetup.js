dbEnv=process.env.DB_ENVIRONMENT||production;
const config=require("./knexfile")[dbEnv];
module.exports=require("knex")(config);