exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("performance_reviews")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("performance_reviews").insert([
        { reviewed: 3 },
        { reviewed: 3 },
        { reviewed: 2 },
        { reviewed: 2 }
      ]);
    });
};
