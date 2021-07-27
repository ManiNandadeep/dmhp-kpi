const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

let tbl_training_body_json = require("../sample-json-calls/call_training_stored_procedure.json")
let tbl_DistrictExpense_json = require("../sample-json-calls/call_districtexpense_storedprocedure.json")

module.exports = {
    bearerToken :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzQwNzYxMSwiZXhwIjoxNjI3NDE0ODExfQ.7O5CUMxaPEXtCDWKuxtjkij_xCwTiykWZe-1RSthgw4",
    authBody: {
        "username":"dmhp",
        "password":process.env.AUTH_PASSWORD
    },
    tbl_training_body : tbl_training_body_json,
    tbl_training_response : [
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
    tbl_districtExpense_body : tbl_training_body_json,
    tbl_districtExpense_response : [
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
    ]
};