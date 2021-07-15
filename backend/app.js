const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonGroupBy = require("json-groupby");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { convertCompilerOptionsFromJson } = require("typescript");
const dotenv = require("dotenv");
const validators = require("./validators");
const mysqlConnector = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;

dotenv.config({ path: "../.env" });

/*
    SET REQUEST HEADERS
*/

app.use(cors());

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
        "Access-Control-Allow-Origin: *",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    next();
});

/*
CONNECT TO MYSQL DATABASE
*/

var passwordRoot = process.env.SQL_ROOT_PASSWORD;
database = "DMHPv1";

var con = mysqlConnector.con(passwordRoot, database);

con.connect(function (err) {
    if (err) console.log(err);
});

/*
Express Middleware to check for the authorisation token - this can be found in "../.env"
*/

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

/*
Users that can use the app - roles to be added later.
*/

var USERS = [
    { id: 1, username: "dmhp" },
    { id: 2, username: "testuser" },
];

var excludedRoutes = ["/api/auth"];

app.use(
    expressJwt({
        secret: process.env.TOKEN_SECRET,
        algorithms: ["HS256"],
    }).unless({ path: excludedRoutes })
);

/*
  Get Bearer Token
*/

app.post("/api/auth", (req, res) => {
    const body = req.body;
    const user = USERS.find((user) => user.username == body.username);
    if (!user || body.password != process.env.AUTH_PASSWORD) {
        return res.sendStatus(401);
    }
    var token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
    });
    res.send({ token });
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

app.post("/training", function (req, res) {
    let display = req.body.display;
    let district_list = req.body.district_list;
    let event_list = req.body.event_list;
    let target_group_list = req.body.target_group_list;
    let resource_list = req.body.resource_list;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let timeperiod_type = req.body.timeperiod_type;
    let year_type = req.body.year_type;
    let group_by = req.body.group_by;
    let facility_list = req.body.facility_list;

    /*
        STORED PROCEDURE CALL
    */

    let sql = `CALL DMHPv1.getTraining (?,?,?,?,?,?,?,?,?,?,?)`;
    con.query(
        sql,
        [
            display,
            group_by,
            district_list,
            facility_list,
            event_list,
            target_group_list,
            resource_list,
            start_date,
            end_date,
            timeperiod_type,
            year_type,
        ],
        function (err, response) {
            if (err) console.log(err);

            /*
                VALIDATION
            */

            let isSafe = validators.trainingValidator(
                display,
                group_by,
                district_list,
                facility_list,
                event_list,
                target_group_list,
                resource_list,
                start_date,
                end_date,
                timeperiod_type,
                year_type
            );
            if (isSafe.checkVar == false) {
                incorrectInputDict = {
                    message: "One or more of the inputs are unsupported",
                    error: isSafe.errorString,
                };
                res.json(incorrectInputDict);
            } else {
                res.json(response);
            }
        }
    );
});

/*
    Call the getDistrictExpense() stored procedure
*/

app.post("/districtexpense", function (req, res) {
    let display = req.body.display;
    let group_by = req.body.group_by;
    let agg = req.body.agg;
    let district_list = req.body.district_list;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let timeperiod_type = req.body.timeperiod_type;
    let year_type = req.body.year_type;

    /*
        STORED PROCEDURE CALL
    */

    let sql = `CALL DMHPv1.getDistrictExpense (?,?,?,?,?,?,?,?)`;

    con.query(
        sql,
        [
            display,
            group_by,
            agg,
            district_list,
            start_date,
            end_date,
            timeperiod_type,
            year_type,
        ],
        function (err, response) {
            if (err) console.log(err);

            /*
                VALIDATION
            */

            let isSafe = validators.districtExpenseValidator(
                display,
                group_by,
                agg,
                district_list,
                start_date,
                end_date,
                timeperiod_type,
                year_type
            );
            if (isSafe.checkVar == false) {
                incorrectInputDict = {
                    message: "One or more of the inputs are unsupported",
                    error: isSafe.errorString,
                };
                res.json(incorrectInputDict);
            } else {
                res.json(response);
            }
        }
    );
});

/*
    Running the app
*/

app.listen(port, () => {
    console.log(`Listening at Port https://localhost:${port}`);
});

module.exports = app;
