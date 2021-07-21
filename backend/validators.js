/*
SQL DateTime to Javascript Date
Compare the dates
*/

const { identifierModuleUrl } = require("@angular/compiler");

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

// Helper function to check if obj is in arr - supports older IE browsers
function includeObj(arr,obj) {
    return (arr.indexOf(obj) != -1);
}



// Validator to check if all array objects are non-negative, and to provide an error string if any element defaults.

function checkIfAllArrayElementsAreNonNegativeErrorString(commaSepString,colName){
    var flag = true;
    var errorString = "";

    
    let arr = commaSepString.split(",");
        for(let i = 0; i < arr.length; i++){
            if(parseInt(arr[i]) < 0){
                flag = false;
                break;
            }
    }

    if(flag === false){
        errorString += colName + " should only have non-negative values."
    }

    let returnDict = {
        flag,
        errorString
    };

    return returnDict;
}

// Validator to check if the object provided lies in a list of objects, and to provide an error string if it doesn't.

function checkObjInArrErrorString(obj,arr,colName){
    var flag = true;
    var errorString = "";

    flag = includeObj(obj,arr);

    if(flag === false){
        errorString += colName + " should be in " + arr.toString();
    }

    let returnDict = {
        flag,
        errorString
    };

    return returnDict;
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
    
        // Date
        let date_safe = true;
        date_safe = returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date ,";
        }

        // Year Type
        let year_arr = ["","c","f"];
        let year_dict = checkObjInArrErrorString(year_type,year_arr,"year_type");
        let year_type_safe = year_dict.flag;
        errorString += year_dict.errorString;
    
        // District List
        let district_dict = checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;
        
        // Event List
        let event_dict = checkIfAllArrayElementsAreNonNegativeErrorString(event_list,"event_list");
        let event_list_safe = event_dict.flag;
        errorString += event_dict.errorString;
        
        // Target List
        let target_dict = checkIfAllArrayElementsAreNonNegativeErrorString(target_group_list,"target_group_list");
        let target_list_safe = target_dict.flag;
        errorString += target_dict.errorString;
        
        // Resource List
        let resource_dict = checkIfAllArrayElementsAreNonNegativeErrorString(resource_list,"resource_list");
        let resource_safe = resource_dict.flag;
        errorString += resource_dict.errorString;

        // Time Period Type
        let time_period_arr = ["annually","quarterly","monthly"];
        let time_period_dict = checkObjInArrErrorString(time_period_safe,time_period_arr,"time_period_type");
        let time_period_safe = time_period_dict.flag;
        errorString += time_period_dict.errorString;

        // Facility List
        let facility_dict = checkIfAllArrayElementsAreNonNegativeErrorString(facility_list,"facility_list");
        let facility_safe = facility_dict.flag;
        errorString += resource_dict.errorString;   
        
    
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
    
        // Date
        let date_safe = true;
        date_safe = returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date ,";
        }
    
        // Year Type
        let year_arr = ["","c","f"];
        let year_dict = checkObjInArrErrorString(year_type,year_arr,"year_type");
        let year_type_safe = year_dict.flag;
        errorString += year_dict.errorString;
    
        // District List
        let district_dict = checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;
    
        // Time Period Type
        let time_period_arr = ["annually","quarterly","monthly"];
        let time_period_dict = checkObjInArrErrorString(time_period_safe,time_period_arr,"time_period_type");
        let time_period_safe = time_period_dict.flag;
        errorString += time_period_dict.errorString;
    
    
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
    
            // Date
            let date_safe = true;
            date_safe = returnDateSafeSQL(start_date, end_date);
            if (date_safe == false) {
                errorString += "end_date should not be before start_date ,";
            }

        
            // District List
            let district_dict = checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
            let district_list_safe = district_dict.flag;
            errorString += district_dict.errorString;

            // Taluka List
            let taluka_dict = checkIfAllArrayElementsAreNonNegativeErrorString(taluka_list,"taluka_list");
            let taluka_list_safe = taluka_dict.flag;
            errorString += taluka_dict.errorString;
          
        
        
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

            let status_list_str = "";


            // Status List
            let status_dict = checkIfAllArrayElementsAreNonNegativeErrorString(status_list,"status_list");
            let status_list_safe = status_dict.flag;
            status_list_str += status_dict.errorString;


            let errorString = error_string_temp + status_list_str;
            let checkVar = status_list_safe && temp_safe;


            
            var returnDict = {
                checkVar,
                errorString,
            };

            return returnDict;

        },

                /*
            Validation for tbl_mnsalloaction's stored procedure

            Checks:
                - districtId are all non-negative
                - quaterlyList should be in [1,2,3,4]
                - financial_year YYYY-YY
            */


        MnsValidator : function checkMNSAllocationExpenseCall(
            display,
            group_by,
            agg,
            district_list,
            quaterly_list,
            financial_year
    ){
        var errorString = "";
    
    
    
        // District List
        let district_dict = checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;

        // Quarterly List 
        let quarter_arr = ["1","2","3","4"];
        let quarter_dict = checkObjInArrErrorString(quaterly_list,quarter_arr,"quaterly_list");
        let quarterly_list_safe = quarter_dict.flag;
        errorString += year_dict.errorString;

        
        // Financial Year
        let financial_year_safe = true;
        let financial_year_arr = financial_year.split("-");

        if(financial_year !== ""){
            if(financial_year_arr.length !== 2 || financial_year_arr[0].length !== 4 || financial_year_arr[1].length !== 2 || (parseInt("20" + financial_year_arr[1]) - parseInt(financial_year_arr[0]) !== 1)){
                financial_year_safe = false;
                errorString += "financial_year should be of the form YYYY-YY";
            }
        }


    
        var checkVar =
            district_list_safe &&
            quarterly_list_safe &&
            financial_year_safe;
            
        var returnDict = {
            checkVar,
            errorString,
        };
    
        return returnDict;
    }


    
    


};