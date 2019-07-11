module.exports = {
  client: "mysql",
  connection: {
    host: "localhost", // Database location
    user: "", // Username for the mysql database
    password: "", // Password for associated user
    database: "" // Database name
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
