import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BackendConnectorService } from "./backend-connector.service";

@Injectable({
    providedIn: "root",
})
export class DistrictControllerService {
    private districtMap: Map<number, string> = new Map();
    private districtList: any = [];

    constructor(public backendConnectorService: BackendConnectorService) {
        this.backendConnectorService
            .getDistricts()
            .subscribe((districtList: any) => {
                this.districtList = [...districtList];
                this.districtMap = this.mapDistricts();
                console.log(this.districtList);
                console.log(this.districtMap);
            });
    }

    private mapDistricts(): Map<number, string> {
        const districtMap: Map<number, string> = new Map();
        for (let i = 0; i < this.districtList.length; ++i) {
            districtMap.set(
                this.districtList[i].districtId,
                this.districtList[i].district
            );
        }
        return districtMap;
    }

    public getDistrictMapping() {
        // use deep clone from lodash or see other methods to deep clone and then return it
        console.log(this.districtMap);
        return this.districtMap;
    }

    public getDistrictList() {
        console.log(this.districtList);
        return this.districtList;
    }
}
