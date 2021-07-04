const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonGroupBy = require("json-groupby");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const app = express();
const port = 3000;

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

/**********************************************************************************************************************************
 *  Connecting to DB
 *
 **********************************************************************************************************************************/

app.get("/", function (req, res, next) {
    res.json({
        message: "Working I am fine",
    });
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "<Add Password here>",
    database: "dmhp",
});

con.connect(function (err) {
    if (err) console.log(err);
});

// sql = "use dmhp";

// con.query(sql, function (err, res) {
//     if (err) console.log(err);
// });

// CHECK
app.post("/check", (req, res, next) => {
    sql = `select * from districts`;
    con.query(sql, function (err, response) {
        if (err) console.log(err);
        res.json(response);
    });
});

/**************************
 *  Training activity type
 **************************/

var trainingDetails =
    "sum(`Medical officers`) as `Medical officers`, \
sum(`Nursing Staff`) as `Nursing Staff`, \
sum(Pharmacist) as Pharmacist, \
sum(`Ayush Doctors`) as `Ayush Doctors`";

var TargetedInterventionDetails =
    "sum(`Elected Representatives`) as `Elected Representatives`, \
sum(`Faith Healers`) as `Faith Healers`, \
sum(`Women & Child development staff`) as `Women & Child development staff`, \
sum(`Police & Prison`) as `Police & Prison`, \
sum(`KSAPS Staff`) as `KSAPS Staff`, \
sum(`ANM/Health workers`) as `ANM/Health workers`, \
sum(`Health Assistants`) as `Health Assistants`, \
sum(`ASHA`) as `ASHA`, \
sum(`Anganwadi`) as `Anganwadi`, \
sum(`Student (School)`) as `Student (School)`, \
sum(`Counselor`) as `Counselor`, \
sum(`Counselling Session in School/College`) as `Counselling Session in School/College`, \
sum(`Teachers Trained in Life skill`) as `Teachers Trained in Life skill`, \
sum(`Suicide Prevention Camps`) as `Suicide Prevention Camps`, \
sum(`Work Place stress management Session`) as `Work Place stress management Session`, \
sum(`Mass Media`) as `Mass Media`, \
sum(`Outdoor Media`) as `Outdoor Media`, \
sum(`Folk Media`) as `Folk Media`, \
sum(`Interpersonal Communication`) as `Interpersonal Communication`, \
sum(`Counselling Session in Work Place`) as `Counselling Session in Work Place`, \
sum(`Counselling Session in Urban Slums`) as `Counselling Session in Urban Slums`, \
sum(`RBSK/RKSK`) as `RBSK/RKSK`, \
sum(`Agriculture University Staff`) as `Agriculture University Staff`, \
sum(`Agriculture Department Staff`) as `Agriculture Department Staff`, \
sum(`Horticulture Department Staff`) as `Horticulture Department Staff`, \
sum(`PLD Banks`) as `PLD Banks`, \
sum(`Corporate society`) as `Corporate society`, \
sum(`RNTCP Staff`) as `RNTCP Staff`, \
sum(`NCD Staff`) as `NCD Staff`, \
sum(`WCD`) as `WCD`, \
sum(`Psychologist`) as `Psychologist`, \
sum(`Social Workers`) as `Social Workers`, \
sum(`Community Helath Workers`) as `Community Helath Workers`, \
sum(`Procuring and translation of IEC`) as `Procuring and translation of IEC`, \
sum(`Primary Health Center`) as `Primary Health Center`, \
sum(`Community Health Center`) as `Community Health Center`, \
sum(`Taluka Hospital`) as `Taluka Hospital`, \
sum(`District Hospital`) as `District Hospital`, \
sum(`Medical Collage`) as `Medical Collage`, \
sum(`Medical Institute`) as `Medical Institute`, \
sum(`Prisons`) as `Prisons`, \
sum(`Village Rehabilitation Workers`) as `Village Rehabilitation Workers`, \
sum(`Multipurpose Rehabilitation Workers`) as `Multipurpose Rehabilitation Workers`, \
sum(`Urban Rehabilitation Workers`) as `Urban Rehabilitation Workers`, \
sum(`District Disability Welfare Officers`) as `District Disability Welfare Officers`, \
sum(`NTCP staff`) as `NTCP staff`, \
sum(`Panchayath Raj Officials`) as `Panchayath Raj Officials`, \
sum(`Primary Land Development Bank Staff`) as `Primary Land Development Bank Staff`, \
sum(`Volunteers  from village level`) as `Volunteers  from village level`, \
sum(`School Students`) as `School Students`, \
sum(`School Teachers`) as `School Teachers`, \
sum(`PU college Students`) as `PU college Students`, \
sum(`PU college  Teachers`) as `PU college  Teachers`, \
sum(`Residential School Students`) as `Residential School Students`, \
sum(`Residential School Teachers`) as `Residential School Teachers`, \
sum(`Teachers (School)`) as `Teachers (School)`, \
sum(`Teachers (College)`) as `Teachers (College)`, \
sum(`Students (College)`) as `Students (College)`, \
sum(`Specify Other`) as `Specify Other`";

var TrainingTiDetails_1 =
    "sum(`Medical officers`) as `Medical officers`, \
sum(`Nursing Staff`) as `Nursing Staff`, \
sum(Pharmacist) as Pharmacist, \
sum(`Ayush Doctors`) as `Ayush Doctors`, \
sum(`Elected Representatives`) as `Elected Representatives`, \
sum(`Faith Healers`) as `Faith Healers`, \
sum(`Women & Child development staff`) as `Women & Child development staff`, \
sum(`Police & Prison`) as `Police & Prison`, \
sum(`KSAPS Staff`) as `KSAPS Staff`, \
sum(`ANM/Health workers`) as `ANM/Health workers`, \
sum(`Health Assistants`) as `Health Assistants`, \
sum(`ASHA`) as `ASHA`, \
sum(`Anganwadi`) as `Anganwadi`, \
sum(`Student (School)`) as `Student (School)`, \
sum(`Counselor`) as `Counselor`, \
sum(`Counselling Session in School/College`) as `Counselling Session in School/College`, \
sum(`Teachers Trained in Life skill`) as `Teachers Trained in Life skill`, \
sum(`Suicide Prevention Camps`) as `Suicide Prevention Camps`, \
sum(`Work Place stress management Session`) as `Work Place stress management Session`, \
sum(`Mass Media`) as `Mass Media`, \
sum(`Outdoor Media`) as `Outdoor Media`";

var TrainingTiDetails_2 =
    "sum(`Folk Media`) as `Folk Media`, \
sum(`Interpersonal Communication`) as `Interpersonal Communication`, \
sum(`Counselling Session in Work Place`) as `Counselling Session in Work Place`, \
sum(`Counselling Session in Urban Slums`) as `Counselling Session in Urban Slums`, \
sum(`RBSK/RKSK`) as `RBSK/RKSK`, \
sum(`Agriculture University Staff`) as `Agriculture University Staff`, \
sum(`Agriculture Department Staff`) as `Agriculture Department Staff`, \
sum(`Horticulture Department Staff`) as `Horticulture Department Staff`, \
sum(`PLD Banks`) as `PLD Banks`, \
sum(`Corporate society`) as `Corporate society`, \
sum(`RNTCP Staff`) as `RNTCP Staff`, \
sum(`NCD Staff`) as `NCD Staff`, \
sum(`WCD`) as `WCD`, \
sum(`Psychologist`) as `Psychologist`, \
sum(`Social Workers`) as `Social Workers`, \
sum(`Community Helath Workers`) as `Community Helath Workers`, \
sum(`Procuring and translation of IEC`) as `Procuring and translation of IEC`, \
sum(`Primary Health Center`) as `Primary Health Center`, \
sum(`Community Health Center`) as `Community Health Center`, \
sum(`Taluka Hospital`) as `Taluka Hospital`, \
sum(`District Hospital`) as `District Hospital`";

var TrainingTiDetails_3 =
    "sum(`Medical Collage`) as `Medical College`, \
sum(`Medical Institute`) as `Medical Institute`, \
sum(`Prisons`) as `Prisons`, \
sum(`Village Rehabilitation Workers`) as `Village Rehabilitation Workers`, \
sum(`Multipurpose Rehabilitation Workers`) as `Multipurpose Rehabilitation Workers`, \
sum(`Urban Rehabilitation Workers`) as `Urban Rehabilitation Workers`, \
sum(`District Disability Welfare Officers`) as `District Disability Welfare Officers`, \
sum(`NTCP staff`) as `NTCP staff`, \
sum(`Panchayath Raj Officials`) as `Panchayath Raj Officials`, \
sum(`Primary Land Development Bank Staff`) as `Primary Land Development Bank Staff`, \
sum(`Volunteers  from village level`) as `Volunteers  from village level`, \
sum(`School Students`) as `School Students`, \
sum(`School Teachers`) as `School Teachers`, \
sum(`PU college Students`) as `PU college Students`, \
sum(`PU college  Teachers`) as `PU college  Teachers`, \
sum(`Residential School Students`) as `Residential School Students`, \
sum(`Residential School Teachers`) as `Residential School Teachers`, \
sum(`Teachers (School)`) as `Teachers (School)`, \
sum(`Teachers (College)`) as `Teachers (College)`, \
sum(`Students (College)`) as `Students (College)`, \
sum(`Specify Other`) as `Specify Other`";

/* app.post("/getTrainingDetails", (req, res) => {
  var input = req.body.year;
  var fields = input.split('_');
  var year = fields[0]+'-04-01';
  var nextYear = fields[1]+'-03-31';
          sql = "select tg.District, d.District, d.Population," + trainingDetails + " \
          from trainingti tg, Districts d \
          where tg.created_date >=? and tg.created_date <=? and tg.District = d.DistrictId and d.District <> 'State Level' \
          group by tg.District, d.Population, d.District";

  con.query(sql, [year, nextYear], function (err, response) {
    // if (err) console.log(err);

    res.json(response);
  });
}) */

app.post("/getTrainingDetails", (req, res) => {
    // var input = req.body.year;
    // var fields = input.split("_");
    // var year = fields[0] + "-04-01";
    // var nextYear = fields[1] + "-03-31";
    var year = "2020-04-01";
    var nextYear = "2021-03-31";
    console.log(year);
    sql = `Select A.District,A.Population,B.WCD_STAFF,B.Medical_Officers,B.Nursing_Staff,B.Pharmacist,B.ANM_Health_Workers, B.Health_Assistants,B.Anganwadi,B.School_Students,B.Ayush_Doctors,B.Counsellor, B.RBSK_RKSK,B.Psychologist,B.Social_Workers,B.Community_Health_Workers,B.School_Teachers,
          B.College_Teachers,B.College_Students from (select District,DistrictId,Population from districts where StateId='17' and DistrictId != '46') A left join
          (select distinct DistrictId,SUM(CASE WHEN TargetGrpId = 3 THEN NoOfPatients ELSE 0 END) as WCD_STAFF,
          SUM(CASE WHEN TargetGrpId = 6 THEN NoOfPatients ELSE 0 END) as Medical_Officers,
          SUM(CASE WHEN TargetGrpId = 7 THEN NoOfPatients ELSE 0 END) as Nursing_Staff,
          SUM(CASE WHEN TargetGrpId = 8 THEN NoOfPatients ELSE 0 END) as Pharmacist,
          SUM(CASE WHEN TargetGrpId = 9 THEN NoOfPatients ELSE 0 END) as ANM_Health_Workers,
          SUM(CASE WHEN TargetGrpId = 10 THEN NoOfPatients ELSE 0 END) as Health_Assistants,
          SUM(CASE WHEN TargetGrpId = 12 THEN NoOfPatients ELSE 0 END) as Anganwadi,
          SUM(CASE WHEN TargetGrpId = 13 THEN NoOfPatients ELSE 0 END) as School_Students,
          SUM(CASE WHEN TargetGrpId = 14 THEN NoOfPatients ELSE 0 END) as Ayush_Doctors,
          SUM(CASE WHEN TargetGrpId = 15 THEN NoOfPatients ELSE 0 END) as Counsellor,
          SUM(CASE WHEN TargetGrpId = 26 THEN NoOfPatients ELSE 0 END) as RBSK_RKSK,
          SUM(CASE WHEN TargetGrpId = 35 THEN NoOfPatients ELSE 0 END) as Psychologist,
          SUM(CASE WHEN TargetGrpId = 36 THEN NoOfPatients ELSE 0 END) as Social_Workers,
          SUM(CASE WHEN TargetGrpId = 37 THEN NoOfPatients ELSE 0 END) as Community_Health_Workers,
          SUM(CASE WHEN TargetGrpId = 60 THEN NoOfPatients ELSE 0 END) as School_Teachers,
          SUM(CASE WHEN TargetGrpId = 61 THEN NoOfPatients ELSE 0 END) as College_Teachers,
          SUM(CASE WHEN TargetGrpId = 62 THEN NoOfPatients ELSE 0 END) as College_Students
          from tbl_training
          where EventFrom between ? and ?
          group by DistrictId) B on A.DistrictId=B.DistrictId
          group by A.District, A.Population
          order by A.District`;

    con.query(sql, [year, nextYear], function (err, response) {
        if (err) console.log(err);
        console.log(response);
        res.json(response);
    });
});

app.listen(port, () => {
    console.log(`Listening at Port https://localhost:${port}`);
});

module.exports = app;
