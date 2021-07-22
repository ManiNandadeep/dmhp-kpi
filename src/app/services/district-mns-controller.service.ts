import { Injectable } from "@angular/core";
import { DistrictControllerService } from "./district-controller.service";

@Injectable({
    providedIn: "root",
})
export class DistrictMNSControllerService {
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();

    constructor(public districtControllerService: DistrictControllerService) {}

    public getDistrictMnsMap(DistrictMnsData: any) {
        const districtMnsMap: Map<string, number> = new Map();
        const districtMap = this.districtControllerService.getDistrictMap();

        for (let i = 0; i < DistrictMnsData.length; ++i) {
            if (districtMap.has(DistrictMnsData[i].DistrictId)) {
                districtMnsMap.set(
                    districtMap.get(DistrictMnsData[i].DistrictId),
                    DistrictMnsData[i].TotalExpense.toFixed(3)
                );
            }
        }

        // console.log(districtMnsMap);
        return districtMnsMap;
    }

    public getMonthlyMNSMap(DistrictMnsData: any) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let MNSExpensePerMonth: Map<string, number> = new Map();
        for (let i = 0; i > -12; --i) {
            let paddingMonth = this.currentMonth + i;
            MNSExpensePerMonth.set(
                `${
                    monthNames[
                        new Date(this.currentYear, paddingMonth).getMonth()
                    ]
                },${new Date(this.currentYear, paddingMonth).getFullYear()}`,
                0
            );
        }
        MNSExpensePerMonth = new Map([...MNSExpensePerMonth].reverse());
        for (let i = 0; i < DistrictMnsData.length; ++i) {
            DistrictMnsData[i].ReportingMonthYear = new Date(
                DistrictMnsData[i].ReportingMonthYear
            );
            const eventMonth =
                monthNames[DistrictMnsData[i].ReportingMonthYear.getMonth()];
            const eventYear =
                DistrictMnsData[i].ReportingMonthYear.getFullYear();
            if (MNSExpensePerMonth.has(`${eventMonth},${eventYear}`)) {
                MNSExpensePerMonth.set(
                    `${eventMonth},${eventYear}`,
                    MNSExpensePerMonth.get(`${eventMonth},${eventYear}`) +
                        DistrictMnsData[i].TotalExpense
                );
            }
        }

        // console.log(MNSExpensePerMonth);
        return MNSExpensePerMonth;
    }

    public getTotalMNSExpenditure(MNSData: any) {
        let totalMNSExpense: number = 0;
        for (let i = 0; i < MNSData.length; ++i) {
            totalMNSExpense += MNSData[i].TotalExpense;
        }

        return totalMNSExpense;
    }
}
