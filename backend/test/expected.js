/*
Configuring the AUTH_PASSWORD from the .env file
*/
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });


/*
Loading in the JSON reuqests
*/
const tbl_training_body = require("../sample-json-calls/call_training_stored_procedure.json");
const tbl_districtExpense_body = require("../sample-json-calls/call_districtexpense_storedprocedure.json");
const tbl_districtMNS_body = require("../sample-json-calls/call_get_district_manasadhara_stored_procedure.json")
const tbl_MNSAllocation_body = require("../sample-json-calls/call_mnsalloaction_stored_procedure.json");

module.exports = {
    bearerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzQwOTM5MSwiZXhwIjoxNjI3NDE2NTkxfQ.tvUZWiuyJv-GGxtYHOmsu5K5qjXkX0KxS3jtvj9dKR8",
    authBody: {
        username: "dmhp",
        password: process.env.AUTH_PASSWORD,
    },
    tbl_training_body: tbl_training_body,
    tbl_training_response: [
        [
            {
                DistrictId: 2,
                financial_year: "2020-2021",
                Quarter: 3,
                noOfPatients: 113,
                noOfEvents: 1,
            },
        ],
        {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 34,
            warningCount: 0,
            message: "",
            protocol41: true,
            changedRows: 0,
        },
    ],
    tbl_districtExpense_body: tbl_districtExpense_body,
    tbl_districtExpense_response: [
        [
            {
                DistrictId: 1,
                TotalExpense: 88.2071,
            },
            {
                DistrictId: 2,
                TotalExpense: 87.70897,
            },
            {
                DistrictId: 3,
                TotalExpense: 99.44484,
            },
        ],
        {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 34,
            warningCount: 0,
            message: "",
            protocol41: true,
            changedRows: 0,
        },
    ],

    tbl_districtMNS_body:tbl_districtMNS_body,

    tbl_districtMNS_response: [
        [
            {
                DistrictId: 27,
                Head_15: 0,
            },
            {
                DistrictId: 29,
                Head_15: 0,
            },
        ],
        {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 34,
            warningCount: 0,
            message: "",
            protocol41: true,
            changedRows: 0,
        },
    ],

    tbl_MNSAllocation_body:tbl_MNSAllocation_body,

    tbl_MNSAllocation_response: [
        [
          {
            "concat(@statement)": "select DistrictId,SUM(RHead_15) as RHead_15 from DMHPv1.tbl_mnsalloaction where StateId = 17 and DistrictId IN (12) and QuaterlyId IN (1,2) and FinancialYear IN (select distinct FinancialYear from DMHPv1.tbl_mnsalloaction) GROUP BY DistrictId"
          }
        ],
        [
          {
            "DistrictId": 12,
            "RHead_15": 5.28
          }
        ],
        {
          "fieldCount": 0,
          "affectedRows": 0,
          "insertId": 0,
          "serverStatus": 34,
          "warningCount": 0,
          "message": "",
          "protocol41": true,
          "changedRows": 0
        }
      ]
};
