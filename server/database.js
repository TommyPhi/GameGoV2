// Declares sql variable that uses mysql module.
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Declaring connection variables that creates a connection to Database
const connection = mysql.createConnection({
  // Sets up connection object with host, database, user, and password values.
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Connect method that uses connection variable to establish connection.

connection.connect(function (err) {
  if (err) throw err;
  console.log("MySql Database is connected");
});

module.exports = connection;
