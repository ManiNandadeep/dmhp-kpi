// Expected responses for the sample JSON calls


module.exports = {
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

    tbl_timeperiod_response : [
        [
          {
            "DistrictId": 3,
            "SUM(SMD)": 1259,
            "SUM(CMD)": 3689,
            "SUM(SuicideAttempts)": 91,
            "TotalCases": 5039
          },
          {
            "DistrictId": 45,
            "SUM(SMD)": 299,
            "SUM(CMD)": 1179,
            "SUM(SuicideAttempts)": 17,
            "TotalCases": 1495
          },
          {
            "DistrictId": 43,
            "SUM(SMD)": 3090,
            "SUM(CMD)": 2973,
            "SUM(SuicideAttempts)": 4,
            "TotalCases": 6067
          },
          {
            "DistrictId": 45,
            "SUM(SMD)": 1981,
            "SUM(CMD)": 4289,
            "SUM(SuicideAttempts)": 156,
            "TotalCases": 6426
          },
          {
            "DistrictId": 43,
            "SUM(SMD)": 4092,
            "SUM(CMD)": 4676,
            "SUM(SuicideAttempts)": 0,
            "TotalCases": 8768
          },
          {
            "DistrictId": 3,
            "SUM(SMD)": 4453,
            "SUM(CMD)": 11313,
            "SUM(SuicideAttempts)": 194,
            "TotalCases": 15960
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


}