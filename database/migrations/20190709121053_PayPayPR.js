exports.up = function(knex) {
  return knex.schema.createTable("employees", table => {
    table.increments().index();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table
      .integer("position_id")
      .unsigned()
      .references("id")
      .inTable("positions")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("employees");
};
