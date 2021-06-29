import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class BackendConnectorService {
    constructor(private http: HttpClient) {}

    // method to get all Districts from tbl_districts
    getDistricts() {
        const districtConfigUrl = "http://localhost:8082/district/";
        return this.http.get(districtConfigUrl);
    }

    // method to get all Talukas from tbl_talukas
    getTalukas() {
        const talukaConfigUrl: string = "http://localhost:8082/taluka/";
        return this.http.get(talukaConfigUrl);
    }

    // method to get event mapping from tbl_bindevents
    getbindEventsList() {
        const eventBindListUrl: string = "http://localhost:8082/bindevent/";
        return this.http.get(eventBindListUrl);
    }

    // method to get targeted groups mapping from tbl_targetgroup
    getbindTargetGroupList() {
        const targetGroupListUrl: string =
            "http://localhost:8082/bindtargetgroup/";
        return this.http.get(targetGroupListUrl);
    }

    // method to get all facilities from tbl_facility
    getFacility() {
        const facilityUrl: string = "http://localhost:8082/facility/";
        return this.http.get(facilityUrl);
    }

    // method to get all training objects from tbl_training
    getTrainingTable() {
        const trainingUrl: string = "http://localhost:8082/training/";
        return this.http.get(trainingUrl);
    }

    //method to get all budgetAllocation objects from tbl_budgetallocation
    getBudgetAllocation() {
        const budgetAllocationUrl: string =
            "http://localhost:8082/budgetallocation/";
        return this.http.get(budgetAllocationUrl);
    }

    // method to get all district expense objects from tbl_districtexpense
    getDistrictExpense() {
        const districtExpenseUrl: string =
            "http://localhost:8082/districtexpense/";
        return this.http.get(districtExpenseUrl);
    }
}
