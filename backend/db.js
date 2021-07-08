/*
    MySQL connection details

*/

var passwordRoot = "";

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: passwordRoot,
    database: "DMHPv1",
});


export {con};