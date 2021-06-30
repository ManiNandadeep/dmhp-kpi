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
    totalExpense!: number;

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

        this.backendConnectorService
            .getDistrictExpense()
            .subscribe((districtExpense: any) => {
                this.totalExpense = 0;
                for (let i = 0; i < districtExpense.length; ++i) {
                    this.totalExpense +=
                        districtExpense[i].ambulatoryService +
                        districtExpense[i].b3012_StaffNurse +
                        districtExpense[i].b30114_SocialWorker +
                        districtExpense[i].b2030_AnnualIncrement +
                        districtExpense[i].b30137_MedialRedAsst +
                        districtExpense[i].b3032_Psychiatrists +
                        districtExpense[i].b30112_Psyst_Counsellor +
                        districtExpense[i].b3032_PsychiatristsTA +
                        districtExpense[i].targetIntervention +
                        districtExpense[i].b30114_SocialWorkerTA +
                        districtExpense[i].operationExpense +
                        districtExpense[i].j18_InnovationMH +
                        districtExpense[i].b30137_WardAsst +
                        districtExpense[i].infrastucture +
                        districtExpense[i].b3012_PsyNurse +
                        districtExpense[i].iec +
                        districtExpense[i].b10162_Awarness +
                        districtExpense[i].drugs +
                        districtExpense[i].miscellanious +
                        districtExpense[i].equipments +
                        districtExpense[i].j17_Contingency +
                        districtExpense[i].training +
                        districtExpense[i].stateStaff1 +
                        districtExpense[i].stateStaff2;
                }
            });
    }
}
