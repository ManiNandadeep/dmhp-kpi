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

    private DistrictListPromise() {
        return this.backendConnectorService.getDistricts().toPromise();
    }

    public async initializeDistricts() {
        const districtListPromise = this.DistrictListPromise();
        this.districtList = await districtListPromise.then((result) => {
            return result;
        });
        this.mapDistricts();
        console.log(this.districtMap);
    }

    private mapDistricts() {
        for (let i = 0; i < this.districtList.length; ++i) {
            this.districtMap.set(
                this.districtList[i].districtId,
                this.districtList[i].district
            );
        }
    }

    public getDistrictList() {
        return this.districtList;
    }

    public getDistrictMap() {
        return this.districtMap;
    }
}
