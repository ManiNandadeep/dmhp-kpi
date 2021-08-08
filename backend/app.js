const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonGroupBy = require("json-groupby");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { convertCompilerOptionsFromJson } = require("typescript");
const dotenv = require("dotenv");
const validators = require("./validation/validators");
const mysqlConnector = require("./resources/db");
const cors = require("cors");
const routes = require("./resources/routes");

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


/*
    EXCLUDED ROUTES
        All applicable routes require authentication by default.
*/

var excludedRoutes = null;
if (process.env.RUN_AUTH === "no") {
    excludedRoutes = routes.auth_no;
} else {
    excludedRoutes = routes.auth_yes;
}

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

    // Get Username and Password
    let email = req.body.email.toLowerCase();
    let password = req.body.password;

    // Validate Emails 
    let emailSafe = validators.emailValidator(email);

    // Validate Passwords 
    let passwordSafe = validators.passwordValidator(password);

    if(!emailSafe || !passwordSafe){
        return res.sendStatus(401);
    }

    // SQL Query
    let sql = "select UserId,IsActive from tbl_users where LOWER(Email)= ? and Password = ?;"
    con.query(
        sql,
            [
                email,
                password
            ],
            function (err, response) {
                if (err) console.log(err);
                let JSON_results = JSON.parse(JSON.stringify(response));

                // Check for database match and IsActive
                if(response.length === 0 || JSON_results[0].IsActive === 0){
                    return res.sendStatus(401);
                }

                else{
                    var token = jwt.sign({ userId: JSON_results[0].UserId }, process.env.TOKEN_SECRET, {
                        expiresIn: process.env.AUTH_TIMEOUT,
                    });
                    res.send({ token });
                }
            }
        );
 
});

/*
    Simple GET query to check if the API accepts requests
*/

// Note: Authorisation is not required for this route

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
            Validation
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
        let sql = `CALL DMHPv1.getTraining (?,?,?,?,?,?,?,?,?,?,?)`;
        /*
                STORED PROCEDURE CALL
        */
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
                res.json(response);
            }
        );
    }
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
        let sql = `CALL DMHPv1.getDistrictExpense (?,?,?,?,?,?,?,?)`;
        /*
            STORED PROCEDURE CALL
         */
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
                res.json(response);
            }
        );
    }
});

/*
    Call the getHRdata() stored procedure
*/

app.post("/hr", function (req, res) {
    let district_list = req.body.district_list;
    let taluka_list = req.body.taluka_list;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;

    /*
        VALIDATION
    */

    let isSafe = validators.HRValidator(
        district_list,
        taluka_list,
        start_date,
        end_date
    );

    if (isSafe.checkVar == false) {
        incorrectInputDict = {
            message: "One or more of the inputs are unsupported",
            error: isSafe.errorString,
        };
        res.json(incorrectInputDict);
    } else {
        let sql = `CALL DMHPv1.getHRdata (?,?,?,?)`;
        /*
            STORED PROCEDURE CALL
        */
        con.query(
            sql,
            [district_list, taluka_list, start_date, end_date],
            function (err, response) {
                if (err) console.log(err);
                res.json(response);
            }
        );
    }
});

/*
    CALL THE getDistrictManasadhara() stored procedure
*/
app.post("/manasadhara", function (req, res) {
    let display = req.body.display;
    let group_by = req.body.group_by;
    let agg = req.body.agg;
    let district_list = req.body.district_list;
    let status_list = req.body.status_list;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let timeperiod_type = req.body.timeperiod_type;
    let year_type = req.body.year_type;

    /*
        VALIDATION
    */

    let isSafe = validators.manasadharaValidator(
        display,
        group_by,
        agg,
        district_list,
        status_list,
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
        let sql = `CALL DMHPv1.getDistrictManasadhara (?,?,?,?,?,?,?,?,?)`;
        /*
                STORED PROCEDURE CALL
            */
        con.query(
            sql,
            [
                display,
                group_by,
                agg,
                district_list,
                status_list,
                start_date,
                end_date,
                timeperiod_type,
                year_type,
            ],
            function (err, response) {
                if (err) console.log(err);
                res.json(response);
            }
        );
    }
});

/*
    CALL THE getMnsAlloAction() stored procedure
*/
app.post("/mnsallocation", function (req, res) {
    let display = req.body.display;
    let group_by = req.body.group_by;
    let agg = req.body.agg;
    let district_list = req.body.district_list;
    let quaterly_list = req.body.quaterly_list;
    let financial_year = req.body.financial_year;

    /*
        VALIDATION
    */

    let isSafe = validators.MnsValidator(
        display,
        group_by,
        agg,
        district_list,
        quaterly_list,
        financial_year
    );

    if (isSafe.checkVar == false) {
        incorrectInputDict = {
            message: "One or more of the inputs are unsupported",
            error: isSafe.errorString,
        };
        res.json(incorrectInputDict);
    } else {
        let sql = `CALL DMHPv1.getMnsAlloAction (?,?,?,?,?,?)`;
        /*
                STORED PROCEDURE CALL
            */
        con.query(
            sql,
            [
                display,
                group_by,
                agg,
                district_list,
                quaterly_list,
                financial_year,
            ],
            function (err, response) {
                if (err) console.log(err);
                res.json(response);
            }
        );
    }
});

/*
    CALL THE timeperiodtype() stored procedure
*/
app.post("/timeperiod", function (req, res) {
    let display = req.body.display;
    let disease = req.body.disease;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let visit_type = req.body.visit_type;
    let gender_string = req.body.gender_string;
    let facilitytype_list = req.body.facilitytype_list;
    let district_list = req.body.district_list;
    let taluka_list = req.body.taluka_list;
    let group_by = req.body.group_by;
    let timeperiod_type = req.body.timeperiod_type;
    let year_type = req.body.year_type;

    /*
            Validation
        */

    let isSafe = validators.timePeriodValidator(
        display,
        disease,
        start_date,
        end_date,
        visit_type,
        gender_string,
        facilitytype_list,
        district_list,
        taluka_list,
        group_by,
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
        let sql = `CALL DMHPv1.timeperiodtype (?,?,?,?,?,?,?,?,?,?,?,?)`;
        /*
                STORED PROCEDURE CALL
            */
        con.query(
            sql,
            [
                display,
                disease,
                start_date,
                end_date,
                visit_type,
                gender_string,
                facilitytype_list,
                district_list,
                taluka_list,
                group_by,
                timeperiod_type,
                year_type,
            ],
            function (err, response) {
                if (err) console.log(err);
                res.json(response);
            }
        );
    }
});

/*
    Running the app
*/

app.listen(port, () => {
    console.log(`Listening at Port https://localhost:${port}`);
});

module.exports = app;
