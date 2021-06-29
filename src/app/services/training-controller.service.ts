import { Injectable } from "@angular/core";
import { BackendConnectorService } from "./backend-connector.service";

@Injectable({
    providedIn: "root",
})
export class TrainingControllerService {
    private trainingList: any = [];
    private currentMonth: number = new Date().getMonth();
    private currentYear: number = new Date().getFullYear();
    private numberOfPatientsPerMonth: Map<string, number | undefined> =
        new Map();

    constructor(private backendConnectorService: BackendConnectorService) {
        // console.log(this.currentMonth, this.currentYear);
    }

    private TrainingListPromise() {
        return this.backendConnectorService.getTrainingTable().toPromise();
    }

    public async initializeTraining() {
        const trainingListPromise = this.TrainingListPromise();
        this.trainingList = await trainingListPromise.then((result: any) => {
            for (let i = 0; i < result.length; ++i) {
                result[i].eventFrom = new Date(result[i].eventFrom);
                result[i].eventTo = new Date(result[i].eventTo);
            }
            return result;
        });
    }

    public getTrainingList() {
        return this.trainingList;
    }

    public getTrainingListLength() {
        return this.trainingList.length;
    }

    public getTotalTrainedPatients() {
        let totalTrainedPatients = 0;
        for (let i = 0; i < this.trainingList.length; ++i) {
            totalTrainedPatients += this.trainingList[i].noOfPatients;
        }
        return totalTrainedPatients;
    }

    public getTotalNumberOfPatientsLastYear() {
        this.getNumberOfPatientsPerMonth();
        let totalNumberOfPatients = 0;
        for (const noOfPatients of this.numberOfPatientsPerMonth.values()) {
            if (noOfPatients) {
                totalNumberOfPatients += noOfPatients;
            }
        }
        return totalNumberOfPatients;
    }

    public getNumberOfPatientsPerDistrict() {
        const patientsPerDistrict: Map<number, number> = new Map();
        for (let i = 0; i < this.trainingList.length; ++i) {
            if (patientsPerDistrict.has(this.trainingList[i].districtId)) {
                patientsPerDistrict.set(
                    this.trainingList[i].districtId,
                    patientsPerDistrict.get(this.trainingList[i].districtId) +
                        this.trainingList[i].noOfPatients
                );
            } else {
                patientsPerDistrict.set(
                    this.trainingList[i].districtId,
                    this.trainingList[i].noOfPatients
                );
            }
        }
        patientsPerDistrict.delete(0);
        console.log(patientsPerDistrict);
        return patientsPerDistrict;
    }

    public getNumberOfPatientsPerMonth() {
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

        const patientsPerMonth: Map<string, number | undefined> = new Map();
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
        for (let i = 0; i < this.trainingList.length; ++i) {
            // console.log("In for loop");
            const eventMonth =
                monthNames[this.trainingList[i].eventFrom.getMonth()];
            const eventYear = this.trainingList[i].eventFrom.getFullYear();
            if (patientsPerMonth.has(`${eventMonth},${eventYear}`)) {
                patientsPerMonth.set(
                    `${eventMonth},${eventYear}`,
                    patientsPerMonth.get(`${eventMonth},${eventYear}`) +
                        this.trainingList[i].noOfPatients
                );
            }
        }
        this.numberOfPatientsPerMonth = patientsPerMonth;
        return patientsPerMonth;
    }
}
