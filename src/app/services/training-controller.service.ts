import { Injectable } from "@angular/core";
import { BackendConnectorService } from "./backend-connector.service";

@Injectable({
    providedIn: "root",
})
export class TrainingControllerService {
    private trainingList: any = [];

    constructor(private backendConnectorService: BackendConnectorService) {}

    private TrainingListPromise() {
        return this.backendConnectorService.getTrainingTable().toPromise();
    }

    public async initializeTraining() {
        const trainingListPromise = this.TrainingListPromise();
        this.trainingList = await trainingListPromise.then((result) => {
            return result;
        });
    }

    public getTrainingList() {
        return this.trainingList;
    }
}
