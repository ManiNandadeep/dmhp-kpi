import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BackendConnectorService } from "./backend-connector.service";

@Injectable({
    providedIn: "root",
})
export class DistrictControllerService {
    private districtMap: Map<number, string> = new Map();
    private districtList: any = [];

    constructor(public backendConnectorService: BackendConnectorService) {}

    public getDistrictList() {
        return this.backendConnectorService.getDistricts().toPromise();
    }
}
