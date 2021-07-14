/*
    MySQL connection details

*/
const mysql = require("mysql");

module.exports = {
    con : function getConnection(password, database){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: password,
            database: database
        })
        return con;
    }
};