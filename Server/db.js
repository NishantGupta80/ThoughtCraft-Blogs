const mysql = require("mysql2");

exports.db = mysql.createConnection({
    host : "localhost",
    user:"root",
    password : "Nishant@7280",
    database :"blog"
})