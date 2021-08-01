import { Injectable } from "@angular/core";
import { DistrictControllerService } from "./district-controller.service";

@Injectable({
    providedIn: "root",
})
export class ReportDataControllerService {
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();

    constructor(public districtControllerService: DistrictControllerService) {}

    public getDistrictReportMap(reportData: any) {
        const districtReportMap: Map<string, number> = new Map();
        const districtMap = this.districtControllerService.getDistrictMap();

        for (let i = 0; i < reportData.length; ++i) {
            if (districtMap.has(reportData[i].DistrictId)) {
                districtReportMap.set(
                    districtMap.get(reportData[i].DistrictId),
                    reportData[i].TotalCases
                );
            }
        }
        console.log(districtReportMap);
        return districtReportMap;
    }

    public getMonthlyReportMap(reportData: any) {
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

        let reportDataPerMonth: Map<string, number> = new Map();
        for (let i = 0; i > -12; --i) {
            let paddingMonth = this.currentMonth + i;
            reportDataPerMonth.set(
                `${
                    monthNames[
                        new Date(this.currentYear, paddingMonth).getMonth()
                    ]
                },${new Date(this.currentYear, paddingMonth).getFullYear()}`,
                0
            );
        }
        reportDataPerMonth = new Map([...reportDataPerMonth].reverse());
        for (let i = 0; i < reportData.length; ++i) {
            // console.log("In for loop");
            reportData[i].ReportingMonthyear = new Date(
                reportData[i].ReportingMonthyear
            );
            const eventMonth =
                monthNames[reportData[i].ReportingMonthyear.getMonth()];
            const eventYear = reportData[i].ReportingMonthyear.getFullYear();
            if (reportDataPerMonth.has(`${eventMonth},${eventYear}`)) {
                reportDataPerMonth.set(
                    `${eventMonth},${eventYear}`,
                    reportDataPerMonth.get(`${eventMonth},${eventYear}`) +
                        reportData[i].TotalCases
                );
            }
        }

        console.log(reportDataPerMonth);
        return reportDataPerMonth;
    }
}
