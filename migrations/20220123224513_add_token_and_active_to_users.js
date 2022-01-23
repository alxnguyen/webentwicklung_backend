
exports.up = function(knex) {
  return knex.schema.table("users", function(table) {
      table.string("token");
      table.boolean("active").notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
    knex.schema.table('users', function(table) {
        table.dropColumn("token");
        table.dropColumn("active");
      });
};
