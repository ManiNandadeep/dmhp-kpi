import { Injectable } from "@angular/core";
import { BackendConnectorService } from "./backend-connector.service";
import { DistrictControllerService } from "./district-controller.service";

@Injectable({
    providedIn: "root",
})
export class TrainingControllerService {
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();

    constructor(
        private backendConnectorService: BackendConnectorService,
        private districtControllerService: DistrictControllerService
    ) {}

    public getBodyParams(timeperiodType: string, yearType: string) {
        const today: Date = new Date();
        const todayLastYear: Date = new Date(
            new Date().setFullYear(today.getFullYear() - 1)
        );
        const bodyParams = {
            display: "DistrictId,ReportingMonthYear",
            district_list: "",
            event_list: "",
            target_group_list: "",
            resource_list: "",
            start_date: todayLastYear.toISOString().slice(0, 10),
            end_date: today.toISOString().slice(0, 10),
            timeperiod_type: timeperiodType,
            year_type: yearType,
        };
        return bodyParams;
    }

    public getDistrictPatientMap(trainingData: any) {
        const districtPatientMap: Map<string, number> = new Map();

        const districtMap = this.districtControllerService.getDistrictMap();

        for (let i = 0; i < trainingData.length; ++i) {
            if (
                districtPatientMap.has(
                    districtMap.get(trainingData[i].DistrictId)
                )
            ) {
                districtPatientMap.set(
                    districtMap.get(trainingData[i].DistrictId),
                    districtPatientMap.get(
                        districtMap.get(trainingData[i].DistrictId)
                    ) + trainingData[i].noOfPatients
                );
            } else {
                districtPatientMap.set(
                    districtMap.get(trainingData[i].DistrictId),
                    trainingData[i].noOfPatients
                );
            }
        }

        console.log(districtPatientMap);
        return districtPatientMap;
    }

    public getMonthlyPatientMap(trainingList: any) {
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

        const patientsPerMonth: Map<string, number> = new Map();
        for (let i = 0; i > -12; --i) {
            let paddingMonth = this.currentMonth + i;
            patientsPerMonth.set(
                `${
                    monthNames[
                        new Date(this.currentYear, paddingMonth).getMonth()
                    ]
                },${new Date(this.currentYear, paddingMonth).getFullYear()}`,
                0
            );
        }
        for (let i = 0; i < trainingList.length; ++i) {
            // console.log("In for loop");
            trainingList[i].EventFrom = new Date(trainingList[i].EventFrom);
            const eventMonth = monthNames[trainingList[i].EventFrom.getMonth()];
            const eventYear = trainingList[i].EventFrom.getFullYear();
            if (patientsPerMonth.has(`${eventMonth},${eventYear}`)) {
                patientsPerMonth.set(
                    `${eventMonth},${eventYear}`,
                    patientsPerMonth.get(`${eventMonth},${eventYear}`) +
                        trainingList[i].noOfPatients
                );
            }
        }
        // this.numberOfPatientsPerMonth = patientsPerMonth;
        console.log(patientsPerMonth);
        return patientsPerMonth;
    }
}
