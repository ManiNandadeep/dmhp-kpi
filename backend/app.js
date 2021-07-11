const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonGroupBy = require("json-groupby");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
// const mysql_connector = require("./db.js").con;

const app = express();
const port = 3000;

/*
    SET REQUEST HEADERS
*/


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    next();
});

/*
CONNECT TO MYSQL DATABASE
*/

var passwordRoot = "emter-your-mysql-root-password-here";


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: passwordRoot,
    database: "DMHPv1",
});

con.connect(function (err) {
    if (err) console.log(err);
});


/*
    Simple GET query to check if the API accepts requests
*/

app.get("/", function (req, res, next) {
    res.json({
        message: "The API is running on port 3000.",
    });
});


/*
    Call the getTraining() Stored Procedure 
*/

app.get("/training", function(req,res){

    let display = req.body.display;
    let district_list = req.body.district_list;
    let event_list = req.body.event_list;
    let target_group_list = req.body.target_group_list;
    let resource_list = req.body.resource_list;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let timeperiod_type = req.body.timeperiod_type;
    let year_type = req.body.year_type;

    let sql = `CALL DMHPv1.getTraining (?,?,?,?,?,?,?,?,?)`;


    con.query(sql, [display,district_list,event_list,target_group_list,resource_list,start_date,end_date,timeperiod_type,year_type], function (err, response) {
         if (err) console.log(err);

         
        let patientSum = 0;
        for(let i = 0; i < Object.keys(response[0]).length; i++){
            patientSum += parseInt(response[0][i].noOfPatients);
            }

        var dict = {"SumPatients": patientSum};
        response.push(dict);        
        res.json(response);
      });
    

});



/*
    Running the app
*/

app.listen(port, () => {
    console.log(`Listening at Port https://localhost:${port}`);
});

module.exports = app;
