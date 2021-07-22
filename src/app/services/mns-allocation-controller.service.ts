import { Injectable } from "@angular/core";
import { DistrictControllerService } from "./district-controller.service";

@Injectable({
    providedIn: "root",
})
export class MnsAllocationControllerService {
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();

    constructor(public districtControllerService: DistrictControllerService) {}

    public getDistrictMNSAllocationMap(MNSAllocationData: any) {
        const districtMNSAllocationMap: Map<string, number> = new Map();
        const districtMap = this.districtControllerService.getDistrictMap();

        for (let i = 0; i < MNSAllocationData.length; ++i) {
            if (districtMap.has(MNSAllocationData[i].DistrictId)) {
                districtMNSAllocationMap.set(
                    districtMap.get(MNSAllocationData[i].DistrictId),
                    MNSAllocationData[i].TotalExpense.toFixed(3)
                );
            }
        }

        console.log(districtMNSAllocationMap);
        return districtMNSAllocationMap;
    }

    public getTotalMNSAllocation(MNSData: any) {
        let totalAllocation: number = 0;
        for (let i = 0; i < MNSData.length; ++i) {
            totalAllocation += MNSData[i].TotalExpense;
        }
        return +totalAllocation.toFixed(3);
    }
}
