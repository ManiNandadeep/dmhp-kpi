const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

module.exports = {
    bearerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzQwMDgxNywiZXhwIjoxNjI3NDA4MDE3fQ.7OE6tLOPuuimHWJdTtnFyGQGvN3v0PGcntHwqx3JhX8",
    authBody: {
        username: "dmhp",
        password: process.env.AUTH_PASSWORD,
    },
    tbl_training_body: {
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
    },
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
    tbl_districtExpense_body: {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "1,2,3",
        start_date: "2018-01-01",
        end_date: "2020-01-01",
        timeperiod_type: "annually",
        year_type: "f",
    },
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

    tbl_districtMNS_body: {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "Head_15",
        district_list: "27,29",
        status_list: "",
        start_date: "2020-01-01",
        end_date: "2020-01-02",
        timeperiod_type: "quarterly",
        year_type: "c",
    },

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

    tbl_MNSAllocation_body: {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "RHead_15",
        district_list: "20,27,28",
        quaterly_list: "1,2",
        financial_year: "",
    },

    tbl_MNSAllocation_response: [
        [
            {
                DistrictId: 27,
                RHead_15: 8.16,
            },
            {
                DistrictId: 28,
                RHead_15: 3.1100000000000003,
            },
            {
                DistrictId: 20,
                RHead_15: 6.42,
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
