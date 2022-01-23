
exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
      table.increments("id");
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("token").notNullable();
      table.boolean("active").notNullable().defaultTo(false);
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};