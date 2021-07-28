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
const tbl_districtMNS_body = require("../sample-json-calls/call_get_district_manasadhara_stored_procedure.json");
const tbl_MNSAllocation_body = require("../sample-json-calls/call_mnsalloaction_stored_procedure.json");
const tbl_HR_body = require("../sample-json-calls/call_hr_storedprocedure.json");

module.exports = {
    bearerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzQ5MjAzOCwiZXhwIjoxNjI3NDk5MjM4fQ.t3C1tl1gr7zjS0K2P-vI_LmFWSNsqTLLVRO1FQbsX94",
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

    tbl_districtMNS_body: tbl_districtMNS_body,

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

    tbl_MNSAllocation_body: tbl_MNSAllocation_body,

    tbl_MNSAllocation_response: [
        [
            {
                DistrictId: 12,
                RHead_15: 5.28,
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

    tbl_HR_body: tbl_HR_body,

    tbl_HR_response: [
        [
            {
                DesignationID: 2,
                TotalActivePeople: 1,
            },
            {
                DesignationID: 5,
                TotalActivePeople: 1,
            },
            {
                DesignationID: 6,
                TotalActivePeople: 1,
            },
            {
                DesignationID: 3,
                TotalActivePeople: 1,
            },
            {
                DesignationID: 9,
                TotalActivePeople: 1,
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
};
