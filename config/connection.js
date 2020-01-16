// Connect to MySQL
var mysql = require("mysql");

var connection = mysql.createConnection(
{
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
});

// Establish connection
connection.connect(function(err)
{
    if(err)
    {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Connected as ID: " + connection.threadId);
});

// Export connection for ORM
module.exports = connection;