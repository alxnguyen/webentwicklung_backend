module.exports = {
  development: {
    client: "pg", 
    connection: {filename: "./migrations" }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:"./migrations"
    },
    seeds:  {
      directory: "./seeds"
    }
  }
};
