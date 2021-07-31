/*
SQL DateTime to Javascript Date
Compare the dates
*/

const helpers = require("./helpers");


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
        date_safe = helpers.returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date , ";
        }

        // Year Type
        let year_arr = ["","c","f"];
        let year_dict = helpers.checkObjInArrErrorString(year_type,year_arr,"year_type");
        let year_type_safe = year_dict.flag;
        errorString += year_dict.errorString;
    
        // District List
        let district_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;
        
        // Event List
        let event_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(event_list,"event_list");
        let event_list_safe = event_dict.flag;
        errorString += event_dict.errorString;
        
        // Target List
        let target_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(target_group_list,"target_group_list");
        let target_list_safe = target_dict.flag;
        errorString += target_dict.errorString;
        
        // Resource List
        let resource_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(resource_list,"resource_list");
        let resource_safe = resource_dict.flag;
        errorString += resource_dict.errorString;

        // Time Period Type
        let time_period_arr = ["annually","quarterly","monthly"];
        let time_period_dict = helpers.checkObjInArrErrorString(timeperiod_type,time_period_arr,"timeperiod_type");
        let time_period_safe = time_period_dict.flag;
        errorString += time_period_dict.errorString;

        // Facility List
        let facility_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(facility_list,"facility_list");
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
        date_safe = helpers.returnDateSafeSQL(start_date, end_date);
        if (date_safe == false) {
            errorString += "end_date should not be before start_date ,";
        }
    
        // Year Type
        let year_arr = ["","c","f"];
        let year_dict = helpers.checkObjInArrErrorString(year_type,year_arr,"year_type");
        let year_type_safe = year_dict.flag;
        errorString += year_dict.errorString;
    
        // District List
        let district_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;
    
        // Time Period Type
        let time_period_arr = ["annually","quarterly","monthly"];
        let time_period_dict = helpers.checkObjInArrErrorString(timeperiod_type,time_period_arr,"time_period_type");
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
            date_safe = helpers.returnDateSafeSQL(start_date, end_date);
            if (date_safe == false) {
                errorString += "end_date should not be before start_date ,";
            }

        
            // District List
            let district_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
            let district_list_safe = district_dict.flag;
            errorString += district_dict.errorString;

            // Taluka List
            let taluka_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(taluka_list,"taluka_list");
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
            let status_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(status_list,"status_list");
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
        let district_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
        let district_list_safe = district_dict.flag;
        errorString += district_dict.errorString;

        // Quarterly List 
        var quarterly_list_safe = true;
        let allowed_quarter_values = ["1","2","3","4"];
        if(quaterly_list !== ""){
            let quarterly_list_arr = quaterly_list.split(",");
            for (let i = 0; i<quarterly_list_arr.length; i++){
                if (helpers.includeObj(quarterly_list_arr[i],allowed_quarter_values) === false){
                    quarterly_list_safe = false;
                    errorString += 
                        "quaterly_list should only be in [1,2,3,4], ";
                    break;
                }
            }
        }

        
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
    },
    

    /*
        Validation for the reportdata's stored procedure

        start_date <= end_date 
        visit_type should be in ['new','old','']
        gender_string should be in ['M','F','O','']
        district_list, taluka_list should have only non-negative values.
        timeperiod_type should be in ['','annually','quarterly','monthly'].
        year_type should be in ['','c','f'].


    */

    timePeriodValidator: function checkSafeTimePeriodCall(
            display, 
            disease, 
            start_date, 
            end_date, 
            visit_type, 
            gender_string, 
            facilitytype_list, 
            district_list, 
            taluka_list, 
            group_by, 
            timeperiod_type, 
            year_type 
    ){

            var errorString = "";
    
            // Date
            let date_safe = true;
            date_safe = helpers.returnDateSafeSQL(start_date, end_date);
            if (date_safe == false) {
                errorString += "end_date should not be before start_date ,";
            }

            // District List
            let district_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(district_list,"district_list");
            let district_list_safe = district_dict.flag;
            errorString += district_dict.errorString;

            // Taluka List
            let taluka_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(taluka_list,"taluka_list");
            let taluka_list_safe = taluka_dict.flag;
            errorString += taluka_dict.errorString;

            // Time Period Type
            let time_period_arr = ["","annually","quarterly","monthly"];
            let time_period_dict = helpers.checkObjInArrErrorString(timeperiod_type,time_period_arr,"time_period_type");
            let time_period_safe = time_period_dict.flag;
            errorString += time_period_dict.errorString;

            // Year Type
            let year_arr = ["","c","f"];
            let year_dict = helpers.checkObjInArrErrorString(year_type,year_arr,"year_type");
            let year_type_safe = year_dict.flag;
            errorString += year_dict.errorString;

            // Visit Type
            let visit_arr = ["new","old",""];
            let visit_dict = helpers.checkObjInArrErrorString(visit_type,visit_arr,"visit_type");
            let visit_type_safe = visit_dict.flag;
            errorString += visit_dict.errorString;

            // Gender String
            let gender_arr = ["M","F","O",""];
            let gender_dict = helpers.checkObjInArrErrorString(gender_string,gender_arr,"gender_string");
            let gender_type_safe = gender_dict.flag;
            errorString += gender_dict.errorString;

            // Facility List
            let facility_dict = helpers.checkIfAllArrayElementsAreNonNegativeErrorString(facilitytype_list,"facilitytype_list");
            let facility_safe = facility_dict.flag;
            errorString += facility_dict.errorString;

            var checkVar =
            date_safe &&
            district_list_safe &&
            taluka_list_safe &&
            time_period_safe &&
            year_type_safe &&
            visit_type_safe &&
            gender_type_safe &&
            facility_safe;
            
            var returnDict = {
                checkVar,
                errorString,
            };
        
            return returnDict;
    }
};  