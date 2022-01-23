
exports.up = function(knex) {
    return knex.schema.createTable("trips", table => {
        table.increments("id");
        table.string("email").notNullable();
        table.string("tripname").notNullable();
        table.string("land").notNullable();
        table.string("start").notNullable();
        table.string("end").notNullable();
        table.string("created").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("trips");
};
