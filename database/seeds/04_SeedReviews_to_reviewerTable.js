exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("reviews_to_reviewer")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("reviews_to_reviewer").insert([
        { review: 1, reviewer: 1, evaluation: "Excellent Fullstack engineer" },
        { review: 2, reviewer: 2, evaluation: "Always write code that is easy to understand" },
        { review: 3, reviewer: 1, evaluation: "Hard worker" },
        { review: 4, reviewer: 3, evaluation: "" }
      ]);
    });
};
