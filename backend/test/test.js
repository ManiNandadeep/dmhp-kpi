// Unit tests for the node.js backend

const pactum = require("pactum");

const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzM5MzU5MiwiZXhwIjoxNjI3NDAwNzkyfQ.b7434BqSQ5S8riZ2PiaHRl-y_Myl7Jj01QotCeyB8oU";

/*
    Sanity check to see if Pactum is running properly
*/
it("Pactum is working properly.", async () => {
    await pactum.spec().get("http://httpbin.org/status/418").expectStatus(418);
});

/*
    Sanity check to make sure that our API is active
*/
it("The API is active.", async () => {
    await pactum.spec().get("http://localhost:3000/").expectStatus(200);
});

/*
    tbl_training API Testing
    http://localhost:3000/training
*/
it("Check status code for tbl_training", async () => {
    const trainingBody = {
        display: "DistrictId,ReportingMonthYear",
        district_list: "",
        event_list: "",
        target_group_list: "",
        resource_list: "",
        start_date: "2017-01-01",
        end_date: "2020-01-01",
        timeperiod_type: "quarterly",
        year_type: "f",
        group_by: "DistrictId,financial_year,Quarter",
        facility_list: "",
    };
    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(trainingBody)
        .expectStatus(200);
});

it("Check output for tbl_training", async () => {
    const trainingBody = {
        display: "DistrictId,ReportingMonthYear",
        district_list: "2",
        event_list: "",
        target_group_list: "",
        resource_list: "",
        start_date: "2020-12-01",
        end_date: "2020-12-02",
        timeperiod_type: "quarterly",
        year_type: "f",
        group_by: "DistrictId,financial_year,Quarter",
        facility_list: "",
    };

    const responseBody = [
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
    ];

    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(trainingBody)
        .expectBody(responseBody);
});

/*
    tbl_DistrictExpense API Testing
    http://localhost:3000/districtexpense
*/
it("Check status code for tbl_districtExpense", async () => {
    const districtExpenseBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "",
        start_date: "2018-01-01",
        end_date: "2020-01-01",
        timeperiod_type: "annually",
        year_type: "f",
    };
    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectStatus(200);
});

it("Check output for tbl_districtExpense", async () => {
    const districtExpenseBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "1,2,3",
        start_date: "2018-01-01",
        end_date: "2020-01-01",
        timeperiod_type: "annually",
        year_type: "f",
    };

    const responseBody = [
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
    ];

    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectBody(responseBody);
});
