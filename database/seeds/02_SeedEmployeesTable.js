exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("employees")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("employees").insert([
        { first_name: "Tomoko", last_name: "Tanaka", position_id: 1 },
        { first_name: "Toshi", last_name: "Ninomae", position_id: 2 },
        { first_name: "Johannes", last_name: "Jarbratt", position_id: 2 }
      ]);
    });
};
