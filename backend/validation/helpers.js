/*
HELPER FUNCTIONS FOR VALIDATION
*/

// Global Helper Function

function includeObj(obj,arr){
    return arr.includes(obj);
}

module.exports = {
    returnDateSafeSQL : function returnDateSafeSQL(SQLdate1String, SQLdate2String) {

        if(SQLdate1String.length === 0 || SQLdate2String.length === 0){
            return false;
        }

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
    },
    
    /*
    // Helper function to check if obj is in arr - supports older IE browsers
    function includeObj(arr,obj) {
        return (arr.indexOf(obj) != -1);
    }
    */
    
    includeObj : function includeObj(obj,arr){
        return arr.includes(obj);
    },
    
    
    
    // Validator to check if all array objects are non-negative, and to provide an error string if any element defaults.
    
    checkIfAllArrayElementsAreNonNegativeErrorString : function checkIfAllArrayElementsAreNonNegativeErrorString(commaSepString,colName){
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
            errorString += colName + " should only have non-negative values. "
        }
    
        let returnDict = {
            flag,
            errorString
        };
    
        return returnDict;
    },
    
    // Validator to check if the object provided lies in a list of objects, and to provide an error string if it doesn't.
    
    checkObjInArrErrorString : function checkObjInArrErrorString(obj,arr,colName){
        var flag = true;
        var errorString = "";
    
        flag = includeObj(obj,arr);
    
        if(flag === false){
            errorString += colName + " should be in " + arr.toString() + " ";
        }
    
        let returnDict = {
            flag,
            errorString
        };
    
        return returnDict;
    }
}