exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("positions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("positions").insert([
        { title: "Manager" },
        { title: "Programmer" },
      ]);
    });
};
