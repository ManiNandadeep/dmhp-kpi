import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BackendConnectorService } from "./backend-connector.service";

@Injectable({
    providedIn: "root",
})
export class DistrictControllerService {
    districtMap = new Map();

    constructor(public backendConnectorService: BackendConnectorService) {
        this.districtMap.set(1, "Bagalkote");
        this.districtMap.set(2, "Bangalore Rural");
        this.districtMap.set(3, "Bangalore Urban");
        this.districtMap.set(12, "Belgaum");
        this.districtMap.set(13, "Bellary");
        this.districtMap.set(15, "Bidar");
        this.districtMap.set(16, "Bijapur");
        this.districtMap.set(17, "Chamrajnagar");
        this.districtMap.set(18, "Chikkaballapur");
        this.districtMap.set(19, "Chikmagalur");
        this.districtMap.set(20, "Chitradurga");
        this.districtMap.set(21, "Dakshina Kannada");
        this.districtMap.set(23, "Davanagere");
        this.districtMap.set(25, "Dharwad");
        this.districtMap.set(27, "Gadag");
        this.districtMap.set(28, "Gulbarga");
        this.districtMap.set(29, "Hassan");
        this.districtMap.set(30, "Haveri");
        this.districtMap.set(31, "Kodagu");
        this.districtMap.set(32, "Kolar");
        this.districtMap.set(33, "Koppal");
        this.districtMap.set(34, "Mandya");
        this.districtMap.set(35, "Mysore");
        this.districtMap.set(37, "Raichur");
        this.districtMap.set(38, "Ramanagar");
        this.districtMap.set(39, "Shimoga");
        this.districtMap.set(41, "Tumkur");
        this.districtMap.set(42, "Udupi");
        this.districtMap.set(43, "Uttara Kannada");
        this.districtMap.set(44, "Yadgir");
        this.districtMap.set(45, "Bbmp");
    }

    public getDistrictMap() {
        return this.districtMap;
    }
}
