/*
SQL DateTime to Javascript Date
Compare the dates
*/

function returnDateSafeSQL(SQLdate1String, SQLdate2String) {
    var sqlDateStr1 = SQLdate1String;
    sqlDateStr1 = sqlDateStr1.replace(/:| /g, "-");
    var YMDhms1 = sqlDateStr1.split("-");
    var sqlDate1 = new Date();

    sqlDate1.setFullYear(
        parseInt(YMDhms1[0]),
        parseInt(YMDhms1[1]) - 1,
        parseInt(YMDhms1[2])
    );

    if (YMDhms1.length == 6) {
        sqlDate1.setHours(
            parseInt(YMDhms1[3]),
            parseInt(YMDhms1[4]),
            parseInt(YMDhms1[5]),
            0
        );
    }

    var sqlDateStr2 = SQLdate2String;
    sqlDateStr2 = sqlDateStr2.replace(/:| /g, "-");
    var YMDhms2 = sqlDateStr2.split("-");
    var sqlDate2 = new Date();

    sqlDate2.setFullYear(
        parseInt(YMDhms2[0]),
        parseInt(YMDhms2[1]) - 1,
        parseInt(YMDhms2[2])
    );

    if (YMDhms2.length == 6) {
        sqlDate2.setHours(
            parseInt(YMDhms2[3]),
            parseInt(YMDhms2[4]),
            parseInt(YMDhms2[5]),
            0
        );
    }

    return sqlDate2.getTime() >= sqlDate1.getTime();
}




module.exports = {

            /*
        Validation for tbl_training's stored procedure

        Checks:
            - start_date <= end_date
            - districtId, eventId, targetGroupId, resourceId are all non-negative
            - YearType should be '','c', or 'f'
            - TimePeriodType should be 'quarterly','monthly', or 'yearly'
        */

    trainingValidator: function checkSafeTrainingCall(
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
    ) {
        var errorString = "";
    
        let date_safe = true;
        date_safe = returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date ,";
        }
    
        let year_type_safe = true;
        if (year_type !== "" && year_type !== "c" && year_type !== "f") {
            errorString += "year_type should be ''/'c'/'f' ,";
            year_type_safe = false;
        }
    
        let district_list_safe = true;
        if (district_list !== "") {
            let district_list_arr = district_list.split(",");
            for (let i = 0; i < district_list_arr.length; i++) {
                if (parseInt(district_list_arr[i]) < 0) {
                    district_list_safe = false;
                    errorString +=
                        "district_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        let event_list_safe = true;
        if (event_list !== "") {
            let event_list_arr = event_list.split(",");
            for (let i = 0; i < event_list_arr.length; i++) {
                if (parseInt(event_list_arr[i]) < 0) {
                    event_list_safe = false;
                    errorString +=
                        "event_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        let target_list_safe = true;
        if (target_group_list !== "") {
            let target_list_arr = target_group_list.split(",");
            for (let i = 0; i < target_list_arr.length; i++) {
                if (parseInt(target_list_arr[i]) < 0) {
                    target_list_safe = false;
                    errorString +=
                        "target_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        let resource_safe = true;
        if (resource_list !== "") {
            let resource_list_arr = resource_list.split(",");
            for (let i = 0; i < resource_list_arr.length; i++) {
                if (parseInt(resource_list_arr[i]) < 0) {
                    resource_safe = false;
                    errorString +=
                        "resource_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        let time_period_safe = true;
        if (
            timeperiod_type !== "annually" &&
            timeperiod_type !== "quarterly" &&
            timeperiod_type !== "monthly"
        ) {
            errorString +=
                "time_period_type should be 'annually'/'quarterly'/'monthly' ,";
            time_period_safe = false;
        }
    
        let facility_safe = true;
        if (facility_list !== "") {
            let facility_list_arr = facility_list.split(",");
            for (let i = 0; i < facility_list_arr.length; i++) {
                if (parseInt(facility_list_arr[i]) < 0) {
                    facility_safe = false;
                    errorString +=
                        "facility_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        var checkVar =
            date_safe &&
            year_type_safe &&
            district_list_safe &&
            event_list_safe &&
            target_list_safe &&
            resource_safe &&
            time_period_safe &&
            facility_safe;
    
        var returnDict = {
            checkVar,
            errorString,
        };
    
        return returnDict;
    },

                /*
            Validation for tbl_districtexpense's stored procedure

            Checks:
                - start_date <= end_date
                - districtId are all non-negative
                - YearType should be '','c', or 'f'
                - TimePeriodType should be 'quarterly','monthly', or 'yearly'
            */


    districtExpenseValidator : function checkSafeDistrictExpenseCall(
        display,
        group_by,
        agg,
        district_list,
        start_date,
        end_date,
        timeperiod_type,
        year_type,
    ){
        var errorString = "";
    
        let date_safe = true;
        date_safe = returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date ,";
        }
    
        let year_type_safe = true;
        if (year_type !== "" && year_type !== "c" && year_type !== "f") {
            errorString += "year_type should be ''/'c'/'f' ,";
            year_type_safe = false;
        }
    
        let district_list_safe = true;
        if (district_list !== "") {
            let district_list_arr = district_list.split(",");
            for (let i = 0; i < district_list_arr.length; i++) {
                if (parseInt(district_list_arr[i]) < 0) {
                    district_list_safe = false;
                    errorString +=
                        "district_list should only have non-negative values ,";
                    break;
                }
            }
        }
    
        let time_period_safe = true;
        if (
            timeperiod_type !== "annually" &&
            timeperiod_type !== "quarterly" &&
            timeperiod_type !== "monthly"
        ) {
            errorString +=
                "time_period_type should be 'annually'/'quarterly'/'monthly' ,";
            time_period_safe = false;
        }
    
    
        var checkVar =
            date_safe &&
            year_type_safe &&
            district_list_safe &&
            time_period_safe;
            
        var returnDict = {
            checkVar,
            errorString,
        };
    
        return returnDict;
    },

        /*
            Validation for tbl_hrdatainfo

            Checks:
                - DistrictIDs, TalukaIDs are non-negative
                - Start Date <= End Date

        */

        HRValidator : function checkHRCall(
            district_list,
            taluka_list,
            start_date,
            end_date,
        ){
            var errorString = "";
    
            let date_safe = true;
            date_safe = returnDateSafeSQL(start_date, end_date);
            if (date_safe == false) {
                errorString += "end_date should not be before start_date ,";
            }

        
            let district_list_safe = true;
            if (district_list !== "") {
                let district_list_arr = district_list.split(",");
                for (let i = 0; i < district_list_arr.length; i++) {
                    if (parseInt(district_list_arr[i]) < 0) {
                        district_list_safe = false;
                        errorString +=
                            "district_list should only have non-negative values ,";
                        break;
                    }
                }
            }

            let taluka_list_safe = true;
            if (taluka_list !== "") {
                let taluka_list_arr = taluka_list.split(",");
                for (let i = 0; i < taluka_list_arr.length; i++) {
                    if (parseInt(taluka_list_arr[i]) < 0) {
                        taluka_list_safe = false;
                        errorString +=
                            "taluka_list should only have non-negative values ,";
                        break;
                    }
                }
            }
        
        
        
            var checkVar =
                taluka_list_safe &&
                district_list_safe &&
                date_safe;
                
            var returnDict = {
                checkVar,
                errorString,
            };
        
            return returnDict;
        },

            /*
            Validation for tbl_manasadhara's stored procedure

            Checks:
                - start_date <= end_date
                - districtId, statusId are all non-negative
                - YearType should be '','c', or 'f'
                - TimePeriodType should be 'quarterly','monthly', or 'yearly'
            */

        manasadharaValidator: function checkManasadharaCall(
            display,
            group_by,
            agg,
            district_list,
            status_list,
            start_date,
            end_date,
            timeperiod_type,
            year_type
        ){
            let temp_safe = false;
            temp_dict = this.districtExpenseValidator(
                display,
                group_by,
                agg,
                district_list,
                start_date,
                end_date,
                timeperiod_type,
                year_type
            )
            temp_safe = temp_dict.checkVar;
            error_string_temp = temp_dict.errorString;

            let status_list_safe = false;
            let status_list_str = "";
            
            if (status_list !== "") {
                let status_list_arr = status_list.split(",");
                for (let i = 0; i < status_list_arr.length; i++) {
                    if (parseInt(status_list_arr[i]) < 0) {
                        status_list_safe = false;
                        status_list_str +=
                            "status_list should only have non-negative values ,";
                        break;
                    }
                }
            }

            let errorString = error_string_temp + status_list_str;
            let checkVar = status_list_safe && temp_safe;
            
            var returnDict = {
                checkVar,
                errorString,
            };

            return returnDict;

        }


    
    


};