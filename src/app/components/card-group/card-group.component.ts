import { Component, OnInit } from "@angular/core";
import { BackendConnectorService } from "src/app/services/backend-connector.service";

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

    totalBudget:number =0;

    constructor(public backendConnectorService: BackendConnectorService) {}

    ngOnInit(): void {
        this.backendConnectorService
            .getTrainingTable()
            .subscribe((trainingList: any) => {
                this.totalTrainings = trainingList.length;
                this.totalTrainingPaxLastYear = 0;
                this.totalTrainingPax = 0;
                console.log(typeof trainingList[1].eventFrom);
                console.log(typeof trainingList[1].eventTo);
                let eventFrom = new Date(trainingList[1].eventFrom);
                console.log(eventFrom);
                console.log(typeof trainingList[1].eventFrom);
                console.log(typeof trainingList[1].eventTo);
                console.log(eventFrom.getFullYear());

                for (let i = 0; i < trainingList.length; ++i) {
                    trainingList[i].eventFrom = new Date(
                        trainingList[i].eventFrom
                    );
                    trainingList[i].eventTo = new Date(trainingList[i].eventTo);
                    if (trainingList[i].eventFrom.getFullYear() >= 2020) {
                        this.totalTrainingPaxLastYear +=
                            trainingList[i].noOfPatients;
                    }
                    this.totalTrainingPax += trainingList[i].noOfPatients;
                }
            });
        this.backendConnectorService
        .getBudgetAllocation()
        .subscribe((budgetList: any)=>{
            for(let i=0;i<budgetList.length;i++){
                this.totalBudget+=parseInt(budgetList[i].totalBudgetAllocated);
            }
            console.log(`hello ${this.totalBudget}`);
        });
    }
}
