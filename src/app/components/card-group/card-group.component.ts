import { Component, OnInit } from "@angular/core";
import { BackendConnectorService } from "src/app/services/backend-connector.service";
import { DistrictExpenseControllerService } from "src/app/services/district-expense-controller.service";
import { DistrictMNSControllerService } from "src/app/services/district-mns-controller.service";
import { MnsAllocationControllerService } from "src/app/services/mns-allocation-controller.service";
import { TrainingControllerService } from "src/app/services/training-controller.service";

@Component({
    selector: "app-card-group",
    templateUrl: "./card-group.component.html",
    styleUrls: ["./card-group.component.css"],
})
export class CardGroupComponent implements OnInit {
    // training variables
    totalEvents!: number;
    totalPatients!: number;

    today: Date = new Date();
    todayLastYear: Date = new Date(
        new Date().setFullYear(this.today.getFullYear() - 1)
    );

    // body params for training last year
    districtTrainingBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        district_list: "",
        facility_list: "",
        event_list: "",
        target_group_list: "",
        resource_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "quarterly",
        year_type: "c",
    };

    // Manasadhara variables
    MNSExpenditure!: number;
    MNSAllocation!: number;

    MnsDistrictBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "",
        status_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "annually",
        year_type: "c",
    };

    MNSAllocationDistrictBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "",
        quaterly_list: "",
        financial_year: "2020-21",
    };

    //district expense variables
    DistrictExpense!: number;
    DistrictExpenseBody = {
        display: "DistrictId",
        group_by: "DistrictId",
        agg: "TotalExpense",
        district_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "annually",
        year_type: "c",
    };

    // HR variables
    activePeople!: number;
    HRDataBody = {
        district_list: "",
        taluka_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: "2021-03-30",
    };

    constructor(
        public backendConnectorService: BackendConnectorService,
        public trainingControllerService: TrainingControllerService,
        public districtMNSControllerService: DistrictMNSControllerService,
        public MNSAllocationControllerService: MnsAllocationControllerService,
        public DistrictExpenseControllerService: DistrictExpenseControllerService
    ) {}

    ngOnInit() {
        this.backendConnectorService
            .getTraining(this.districtTrainingBody)
            .subscribe((data: any) => {
                // console.log(data);
                const trainingData = data[0];

                [this.totalEvents, this.totalPatients] =
                    this.trainingControllerService.getTotal(trainingData);

                // console.log(this.totalEvents, this.totalPatients);
            });

        this.backendConnectorService
            .getDistrictManasadhara(this.MnsDistrictBody)
            .subscribe((data: any) => {
                // console.log(data);
                const MNSData = data[0];

                this.MNSExpenditure =
                    this.districtMNSControllerService.getTotalMNSExpenditure(
                        MNSData
                    );
                // console.log(this.MNSExpenditure);
            });

        this.backendConnectorService
            .getMNSAllocation(this.MNSAllocationDistrictBody)
            .subscribe((data: any) => {
                const MNSData = data[0];
                // console.log(MNSData);
                this.MNSAllocation =
                    this.MNSAllocationControllerService.getTotalMNSAllocation(
                        MNSData
                    );
            });

        this.backendConnectorService
            .getDistrictExpense(this.DistrictExpenseBody)
            .subscribe((data: any) => {
                const DistrictExpenseData = data[0];
                // console.log(DistrictExpenseData);
                this.DistrictExpense =
                    this.DistrictExpenseControllerService.getTotalDistrictExpenditure(
                        DistrictExpenseData
                    );
            });

        this.backendConnectorService
            .getHRData(this.HRDataBody)
            .subscribe((data: any) => {
                const HRData = data[0];
                console.log(HRData);
                this.activePeople = 0;
                for (let i = 0; i < HRData.length; ++i) {
                    this.activePeople += HRData[i].TotalActivePeople;
                }
            });
    }
}
