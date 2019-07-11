exports.up = function(knex) {
  return knex.schema.createTable("performance_reviews", table => {
    table.increments().index();
    table
      .integer("reviewed")
      .unsigned()
      .references("id")
      .inTable("employees")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("performance_reviews");
};
