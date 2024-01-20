// Declares sql variable that uses mysql module.
const mysql = require('mysql2')

// Declaring connection variables that creates a connection to Database
const connection = mysql.createConnection({
    // Sets up connection object with host, database, user, and password values.
    host: 'localhost',
    database: 'GameGo',
    user: 'root',
    password: 'password',
});

// Connect method that uses connection variable to establish connection.
connection.connect(function (err) {
    if(err) throw err;
    console.log('MySql Database is connected')
});

module.exports = connection;