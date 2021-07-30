/*
Configuring the AUTH_PASSWORD from the .env file
*/
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

/*
Loading in the JSON requests
*/
const tbl_training_body = require("../sample-json-calls/call_training_stored_procedure.json");
const tbl_districtExpense_body = require("../sample-json-calls/call_districtexpense_storedprocedure.json");
const tbl_districtMNS_body = require("../sample-json-calls/call_get_district_manasadhara_stored_procedure.json");
const tbl_MNSAllocation_body = require("../sample-json-calls/call_mnsalloaction_stored_procedure.json");
const tbl_HR_body = require("../sample-json-calls/call_hr_storedprocedure.json");


/*
Loading in the JSON responses
*/
const responses = require("./responses");

module.exports = {
    bearerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzYyNjQzNiwiZXhwIjoxNjI3NjMzNjM2fQ.fN7mcvvadH9sdC577Xu2HMcyimi74F1DqX6DsCSbH6c",
    authBody: {
        username: "dmhp",
        password: process.env.AUTH_PASSWORD,
    },

    tbl_training_body: tbl_training_body,
    tbl_training_response:responses.tbl_training_response,

    tbl_districtExpense_body: tbl_districtExpense_body,
    tbl_districtExpense_response: responses.tbl_districtExpense_response,

    tbl_districtMNS_body: tbl_districtMNS_body,
    tbl_districtMNS_response: responses.tbl_districtMNS_response,

    tbl_MNSAllocation_body: tbl_MNSAllocation_body,
    tbl_MNSAllocation_response: responses.tbl_MNSAllocation_response,

    tbl_HR_body: tbl_HR_body,
    tbl_HR_response: responses.tbl_HR_response
};
