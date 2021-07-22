import { Injectable } from "@angular/core";
import { DistrictControllerService } from "./district-controller.service";

@Injectable({
    providedIn: "root",
})
export class DistrictExpenseControllerService {
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();

    constructor(public districtControllerService: DistrictControllerService) {}

    public getDistrictExpenseMap(expenseData: any) {
        const districtExpenseMap: Map<string, number> = new Map();
        const districtMap = this.districtControllerService.getDistrictMap();

        for (let i = 0; i < expenseData.length; ++i) {
            if (districtMap.has(expenseData[i].DistrictId)) {
                districtExpenseMap.set(
                    districtMap.get(expenseData[i].DistrictId),
                    expenseData[i].TotalExpense.toFixed(3)
                );
            }
        }
        return districtExpenseMap;
    }

    public getMonthlyExpenseMap(expenseList: any) {
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

        let ExpensePerMonth: Map<string, number> = new Map();
        for (let i = 0; i > -12; --i) {
            let paddingMonth = this.currentMonth + i;
            ExpensePerMonth.set(
                `${
                    monthNames[
                        new Date(this.currentYear, paddingMonth).getMonth()
                    ]
                },${new Date(this.currentYear, paddingMonth).getFullYear()}`,
                0
            );
        }
        ExpensePerMonth = new Map([...ExpensePerMonth].reverse());
        for (let i = 0; i < expenseList.length; ++i) {
            // console.log("In for loop");
            expenseList[i].ReportingMonthYear = new Date(
                expenseList[i].ReportingMonthYear
            );
            const eventMonth =
                monthNames[expenseList[i].ReportingMonthYear.getMonth()];
            const eventYear = expenseList[i].ReportingMonthYear.getFullYear();
            if (ExpensePerMonth.has(`${eventMonth},${eventYear}`)) {
                ExpensePerMonth.set(
                    `${eventMonth},${eventYear}`,
                    ExpensePerMonth.get(`${eventMonth},${eventYear}`) +
                        expenseList[i].TotalExpense.toFixed(3)
                );
            }
        }

        // console.log(ExpensePerMonth);
        return ExpensePerMonth;
    }
    public getTotalDistrictExpenditure(ExpensePerMonth:any){
        let TotalDistrictExpenditure:number=0;
        for (let i=0;i<ExpensePerMonth.length;i++){
            TotalDistrictExpenditure+=ExpensePerMonth[i].TotalExpense;
        }
        return +TotalDistrictExpenditure.toFixed(3);
    }
}

