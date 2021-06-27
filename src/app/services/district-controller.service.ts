import { Injectable } from "@angular/core";
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
                for (let i = 0; i < this.districtList.length; ++i) {
                    this.districtMap.set(
                        this.districtList[i].districtId,
                        this.districtList[i].district
                    );
                }
            });

        // this.mapDistricts();
    }

    private mapDistricts() {
        for (let i = 0; i < this.districtList.length; ++i) {
            this.districtMap.set(
                this.districtList[i].districtId,
                this.districtList[i].district
            );
        }
    }

    public getDistrictMapping() {
        // use deep clone from lodash or see other methods to deep clone and then return it
        let returnDistrictMap = Object.assign({}, this.districtMap);
        console.log(this.districtMap);
        returnDistrictMap = new Map(this.districtMap);
        console.log(returnDistrictMap);
        // console.log(this.districtMap);
        // return returnDistrictMap;
        return this.districtMap;
    }

    public getDistrictList() {
        console.log(this.districtList);
        return this.districtList.splice();
    }
}
