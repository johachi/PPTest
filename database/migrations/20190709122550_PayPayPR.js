exports.up = function(knex) {
  return knex.schema.alterTable("reviews_to_reviewer", table => {
    table.unique(["review", "reviewer"]);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("reviews_to_reviewer", table => {
    table.dropUnique(["review", "reviewer"]);
  });
};
