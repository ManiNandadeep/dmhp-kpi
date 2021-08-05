import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class BackendConnectorService {
    rootUrl: string = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    getDistricts() {
        const districtConfigUrl = `${this.rootUrl}/district/`;
        return this.http.get(districtConfigUrl);
    }

    getTalukas() {
        const talukaConfigUrl: string = `${this.rootUrl}/taluka/`;
        return this.http.get(talukaConfigUrl);
    }

    getbindEventsList() {
        const eventBindListUrl: string = `${this.rootUrl}/bindevent/`;
        return this.http.get(eventBindListUrl);
    }

    getbindTargetGroupList() {
        const targetGroupListUrl: string = `${this.rootUrl}/bindtargetgroup/`;
        return this.http.get(targetGroupListUrl);
    }

    getFacility() {
        const facilityUrl: string = `${this.rootUrl}/facility/`;
        return this.http.get(facilityUrl);
    }

    getTraining(bodyParams: any) {
        const trainingUrl: string = `${this.rootUrl}/training`;
        return this.http.post(trainingUrl, bodyParams);
    }

    getDistrictExpense(bodyParams: any) {
        const districtExpenseUrl: string = `${this.rootUrl}/districtexpense`;
        return this.http.post(districtExpenseUrl, bodyParams);
    }

    getDistrictManasadhara(bodyParams: any) {
        const districtMnsUrl: string = `${this.rootUrl}/manasadhara`;
        return this.http.post(districtMnsUrl, bodyParams);
    }

    getMNSAllocation(bodyParams: any) {
        const MNSAllocationUrl: string = `${this.rootUrl}/mnsallocation`;
        return this.http.post(MNSAllocationUrl, bodyParams);
    }

    getHRData(bodyParams: any) {
        const HRDataInfoUrl: string = `${this.rootUrl}/hr`;
        return this.http.post(HRDataInfoUrl, bodyParams);
    }

    getpatientReports(bodyParams: any) {
        const patientReportsUrl: string = `${this.rootUrl}/timeperiod`;
        return this.http.post(patientReportsUrl, bodyParams);
    }
}
