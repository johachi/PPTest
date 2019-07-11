exports.up = function(knex) {
  return knex.schema.createTable("reviews_to_reviewer", table => {
    table
      .integer("review")
      .unsigned()
      .references("id")
      .inTable("performance_reviews")
      .onDelete("CASCADE");

    table
      .integer("reviewer")
      .unsigned()
      .references("id")
      .inTable("employees")
      .onDelete("CASCADE");

    table.string("evaluation");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews_to_reviewer");
};
