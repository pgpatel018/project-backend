const mysql = require('mysql');
require("dotenv").config();

const connectionString = `mysql://${process.env.DEV}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`;

const connection = mysql.createPool(connectionString);

connection.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("Joined to the database");
});

process.on('exit', function() {
    connection.end();
});


module.exports = connection;
