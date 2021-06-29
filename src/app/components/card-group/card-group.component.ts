import { Component, OnInit } from "@angular/core";
import { BackendConnectorService } from "src/app/services/backend-connector.service";
import { TrainingControllerService } from "src/app/services/training-controller.service";

@Component({
    selector: "app-card-group",
    templateUrl: "./card-group.component.html",
    styleUrls: ["./card-group.component.css"],
})
export class CardGroupComponent implements OnInit {
    // training variables
    totalTrainings!: number;
    totalTrainingPaxLastYear!: number;
    totalTrainingPax!: number;

    // budget and expense variables
    totalBudget!: number;

    constructor(
        public backendConnectorService: BackendConnectorService,
        public trainingControllerService: TrainingControllerService
    ) {}

    async ngOnInit() {
        if (this.trainingControllerService.getTrainingListLength() == 0) {
            await this.trainingControllerService.initializeTraining();
        }
        this.totalTrainings =
            this.trainingControllerService.getTrainingListLength();
        this.totalTrainingPax =
            this.trainingControllerService.getTotalTrainedPatients();
        this.totalTrainingPaxLastYear =
            this.trainingControllerService.getTotalNumberOfPatientsLastYear();

        this.backendConnectorService
            .getBudgetAllocation()
            .subscribe((budgetList: any) => {
                this.totalBudget = 0;
                for (let i = 0; i < budgetList.length; i++) {
                    this.totalBudget += parseInt(
                        budgetList[i].quaterlyReleasedAmt
                    );
                }
                console.log(`hello ${this.totalBudget}`);
            });
    }
}
