const express = require("express");
const path = require("path");
const knexOptions = require("../database/config");
const knex = require("knex")(knexOptions);
const cors = require("cors");

const server = () => {
  const app = express();

  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, "client/build")));

  app.use(express.json()); // To get the data in the body as JSON.

  app.use(cors()); // To not get CORS error when accessing the API from the frontend.

  // API endpoint for admin
  // // Delete an employee
  app.delete("/api/admin/employees/:employeeID", (req, res) => {
    const employeeID = ~~req.params.employeeID;
    knex("employees")
      .where({ id: employeeID })
      .del()
      .then(() => {
        res.send("Deleted");
      })
      .catch(err => {
        res.send("Could not delete employee");
      });
  });

  // // Update an employee
  app.put("/api/admin/employees/:employeeID", (req, res) => {
    // TODO: Implement Admin Endpoint
    const employeeID = ~~req.params.employeeID;
    const { first_name, last_name, position_id } = req.body;
    knex("employees")
      .where({ id: employeeID })
      .update({ first_name, last_name, position_id })
      .then(() => {
        res.send("Updated");
      })
      .catch(err => {
        res.status(500).send("Could not update employee information");
      });
  });

  // // Add an employee
  app.put("/api/admin/employees", (req, res) => {
    const { first_name, last_name, position_id } = req.body;
    knex("employees")
      .insert({ first_name, last_name, position_id })
      .then(() => {
        res.send();
      })
      .catch(err => {
        res.status(500).send("Could not add employee.");
      });
  });

  // // Get reviews "to be written" / "written" by employee with employee ID === :employeeID
  app.get("/api/admin/:employeeID/evaluations/", (req, res) => {
    const employeeID = ~~req.params.employeeID;
    knex
      .select(
        "r2r.review",
        "r2r.evaluation",
        "pr.reviewed",
        "e.first_name",
        "e.last_name",
        "p.title"
      )
      .from("reviews_to_reviewer AS r2r")
      .innerJoin("performance_reviews AS pr", "r2r.review", "pr.id")
      .innerJoin("employees AS e", "pr.reviewed", "e.id")
      .innerJoin("positions AS p", "e.position_id", "p.id")
      .where({ "r2r.reviewer": employeeID })
      .then(reviews => {
        res.json(reviews);
      })
      .catch(() => {
        res.status(500).send("Could not get reviews for that user.");
      });
  });

  // // Get what reviews employee with employee ID - :employeeID has gotten from others
  app.get("/api/admin/evaluations/:employeeID/", (req, res) => {
    const employeeID = ~~req.params.employeeID;
    knex
      .select(
        "r2r.review",
        "r2r.evaluation",
        "pr.reviewed",
        "e.first_name",
        "e.last_name",
        "p.title",
        "revE.first_name AS reviewers_first_name",
        "revE.last_name AS reviewers_last_name",
      )
      .from("reviews_to_reviewer AS r2r")
      .innerJoin("performance_reviews AS pr", "r2r.review", "pr.id")
      .innerJoin("employees AS e", "pr.reviewed", "e.id")
      .innerJoin("positions AS p", "e.position_id", "p.id")
      .innerJoin("employees AS revE", "r2r.reviewer", "revE.id")
      .where({ "pr.reviewed": employeeID })
      .then(reviews => {
        res.json(reviews);
      })
      .catch(() => {
        res.status(500).send("Could not get reviews for that user.");
      });
  });

  // Get all employees
  app.get("/api/admin/employees", (req, res) => {
    // TODO: Implement Admin Endpoint
    knex
      .select(
        "employees.id",
        "employees.first_name",
        "employees.last_name",
        "positions.title"
      )
      .from("employees")
      .innerJoin("positions", "employees.position_id", "positions.id")
      .then(allEmployees => {
        res.send(allEmployees);
      });
  });

  // API endpoints for employees
  // // Get pending reviews for employee :employeeID
  app.get("/api/employees/:employeeID/evaluations/pending", (req, res) => {
    const employeeID = ~~req.params.employeeID;
    knex
      .select(
        "r2r.review",
        "r2r.evaluation",
        "pr.reviewed",
        "e.first_name",
        "e.last_name",
        "p.title"
      )
      .from("reviews_to_reviewer AS r2r")
      .innerJoin("performance_reviews AS pr", "r2r.review", "pr.id")
      .innerJoin("employees AS e", "pr.reviewed", "e.id")
      .innerJoin("positions AS p", "e.position_id", "p.id")
      .where({ "r2r.evaluation": "", "r2r.reviewer": employeeID })
      .then(reviews => {
        res.json(reviews);
      });
  });

  // // :employeeID can update a review
  app.post("/api/employees/:employeeID/evaluations/:review", (req, res) => {
    const employeeID = ~~req.params.employeeID;
    const review = ~~req.params.review;
    const { evaluation } = req.body.data;
    knex("reviews_to_reviewer")
      .where({ review, reviewer: employeeID })
      .update({ evaluation })
      .then(() => {
        res.send("Updated review");
      })
      .catch(() => {
        res.status(500).send("Could update review.");
      });
  });

  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

  return app;
};

module.exports = { server };
