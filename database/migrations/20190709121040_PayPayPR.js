exports.up = function(knex) {
  return knex.schema.createTable("positions", table => {
    table.increments().index();
    table.string("title").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("positions");
};
