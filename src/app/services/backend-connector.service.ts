import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class BackendConnectorService {
    constructor(private http: HttpClient) {}

    getDistricts() {
        const districtConfigUrl = "http://localhost:3000/district/";
        return this.http.get(districtConfigUrl);
    }

    getTalukas() {
        const talukaConfigUrl: string = "http://localhost:3000/taluka/";
        return this.http.get(talukaConfigUrl);
    }

    getbindEventsList() {
        const eventBindListUrl: string = "http://localhost:3000/bindevent/";
        return this.http.get(eventBindListUrl);
    }

    getbindTargetGroupList() {
        const targetGroupListUrl: string =
            "http://localhost:3000/bindtargetgroup/";
        return this.http.get(targetGroupListUrl);
    }

    getFacility() {
        const facilityUrl: string = "http://localhost:3000/facility/";
        return this.http.get(facilityUrl);
    }

    getTraining(bodyParams: any) {
        const trainingUrl: string = "http://localhost:3000/training";
        return this.http.post(trainingUrl, bodyParams);
    }

    getDistrictExpense(bodyParams: any) {
        const districtExpenseUrl: string =
            "http://localhost:3000/districtexpense";
        return this.http.post(districtExpenseUrl, bodyParams);
    }

    getDistrictManasadhara(bodyParams: any) {
        const districtMnsUrl: string = "http://localhost:3000/manasadhara";
        return this.http.post(districtMnsUrl, bodyParams);
    }

    getMNSAllocation(bodyParams: any) {
        const MNSAllocationUrl: string = "http://localhost:3000/mnsallocation";
        return this.http.post(MNSAllocationUrl, bodyParams);
    }
}
