const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonGroupBy = require("json-groupby");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { convertCompilerOptionsFromJson } = require("typescript");
const dotenv = require('dotenv');


const app = express();
const port = 3000;


dotenv.config({path:"../.env",});

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

var passwordRoot = process.env.SQL_ROOT_PASSWORD;


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
SQL DateTime to Javascript Date
Compare the dates
*/

function returnDateSafeSQL(SQLdate1String, SQLdate2String){   
    var sqlDateStr1 = SQLdate1String; 
    sqlDateStr1 = sqlDateStr1.replace(/:| /g,"-");   
    var YMDhms1 = sqlDateStr1.split("-");
    var sqlDate1 = new Date();

    sqlDate1.setFullYear(parseInt(YMDhms1[0]), parseInt(YMDhms1[1])-1,
        parseInt(YMDhms1[2]));
    
    if(YMDhms1.length == 6){
        sqlDate1.setHours(parseInt(YMDhms1[3]), parseInt(YMDhms1[4]), 
            parseInt(YMDhms1[5]), 0);
    }

    var sqlDateStr2 = SQLdate2String; 
    sqlDateStr2 = sqlDateStr2.replace(/:| /g,"-");
    var YMDhms2 = sqlDateStr2.split("-");
    var sqlDate2 = new Date();
    
    sqlDate2.setFullYear(parseInt(YMDhms2[0]), parseInt(YMDhms2[1])-1,
        parseInt(YMDhms2[2]));

    if(YMDhms2.length == 6){
        sqlDate2.setHours(parseInt(YMDhms2[3]), parseInt(YMDhms2[4]), 
            parseInt(YMDhms2[5]), 0);
    }

    return sqlDate2.getTime() >= sqlDate1.getTime();
}

/*
Validation for tbl_training's stored procedure

Checks:
    - start_date <= end_date
    - districtId, eventId, targetGroupId, resourceId are all non-negative
    - YearType should be '','c', or 'f'
    - TimePeriodType should be 'quarterly','monthly', or 'yearly'
*/

function checkSafeTrainingCall(display,group_by,district_list,facility_list,event_list,target_group_list,resource_list,start_date,end_date,timeperiod_type,year_type){

    let date_safe = true;
    date_safe = returnDateSafeSQL(start_date,end_date);
    
    let year_type_safe = true; 
    if(year_type !== "" && year_type !== "c" && year_type !== "f") {
        year_type_safe = false;
    }

    let district_list_safe = true;
    if(district_list !== ""){
        let district_list_arr = district_list.split(",");
        for(let i = 0; i < district_list_arr.length; i++){
            if(parseInt(district_list_arr[i]) < 0)  {
                district_list_safe = false;
                break;
            }
        }
    }

    let event_list_safe = true;
    if(event_list !== ""){
        let event_list_arr = event_list.split(",");
        for(let i = 0; i < event_list_arr.length; i++){
            if(parseInt(event_list_arr[i]) < 0)  {
                event_list_safe = false;
                break;
            }
        }
    }

    let target_list_safe = true;
    if(target_group_list !== ""){
        let target_list_arr = target_group_list.split(",");
        for(let i = 0; i < target_list_arr.length; i++){
            if(parseInt(target_list_arr[i]) < 0)  {
                target_list_safe = false;
                break;
            }
        }
    }

    let resource_safe = true;
    if(resource_list !== ""){
        let resource_list_arr = resource_list.split(",");
        for(let i = 0; i < resource_list_arr.length; i++){
            if(parseInt(resource_list_arr[i]) < 0)  {
                resource_safe = false;
                break;
            }
        }
    }

    let time_period_safe = true;
    if(timeperiod_type !== "annually" && timeperiod_type !== "quarterly" && timeperiod_type !== "monthly") {
        time_period_safe = false;
    }

    let facility_safe = true;
    if(facility_list !== ""){
        let facility_list_arr = facility_list.split(",");
        for(let i = 0; i < facility_list_arr.length; i++){
            if(parseInt(facility_list_arr[i]) < 0)  {
                facility_safe = false;
                break;
            }
        }
    }


    return date_safe && year_type_safe && district_list_safe && event_list_safe && target_list_safe && resource_safe && time_period_safe && facility_safe;
}


/*
JWT Authentication
*/


/*
Express Middleware to check for the authorisation token - this can be found in "../.env"
*/

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403) 
      req.user = user
      next()
    })
  }

/*
Users that can use the app - roles to be added later.
*/

var USERS = [
    {'id':1,'username':'dmhp'},
    {'id':2,'username': 'testuser'}
  ];
  
app.use(expressJwt({secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }).unless({path: ['/api/auth']}));


/*
  Get Bearer Token
*/

app.post("/api/auth",(req,res)=>{
    const body = req.body;
    const user  = USERS.find(user=>user.username== body.username);
    if(!user || body.password!=process.env.AUTH_PASSWORD){
      return res.sendStatus(401);
    }
    var token = jwt.sign({userId:user.id},process.env.TOKEN_SECRET,{expiresIn:'2h'});
    res.send({token});
  })
  




/*
    Simple GET query to check if the API accepts requests
*/

app.get("/",authenticateToken, function (req, res, next) {
    res.json({
        message: "The API is running on port 3000.",
    });
});


/*
    Call the getTraining() Stored Procedure 
*/

app.get("/training",authenticateToken, function(req,res){

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
    con.query(sql, [display,group_by,district_list,facility_list,event_list,target_group_list,resource_list,start_date,end_date,timeperiod_type,year_type], function (err, response) {
        
        if (err) console.log(err);
            
        /*
                VALIDATION
        */

        let isSafe = checkSafeTrainingCall(display,group_by,district_list,facility_list,event_list,target_group_list,resource_list,start_date,end_date,timeperiod_type,year_type);

        if(isSafe == false){
            incorrectInputDict = {
                "message" : "One or more of the inputs are unsupported"
            };
            res.json(incorrectInputDict);
        }
    

        else{
            res.json(response);
        }
      });
    

});



/*
    Running the app
*/

app.listen(port, () => {
    console.log(`Listening at Port https://localhost:${port}`);
});

module.exports = app;
