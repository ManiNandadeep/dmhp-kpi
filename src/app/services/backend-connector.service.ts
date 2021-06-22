import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

    getbindEventsList() {
        const eventBindListUrl: string = "http://localhost:8082/bindevent/";
        return this.http.get(eventBindListUrl);
    }

    getbindTargetGroupList() {
        const targetGroupListUrl: string =
            "http://localhost:8082/bindtargetgroup/";
        return this.http.get(targetGroupListUrl);
    }

    getFacility() {
        const facilityUrl: string = "http://localhost:8082/facility/";
        return this.http.get(facilityUrl);
    }
}
