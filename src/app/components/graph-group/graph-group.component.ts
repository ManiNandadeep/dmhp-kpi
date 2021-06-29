import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";
import { from } from "rxjs";
import { BackendConnectorService } from "src/app/services/backend-connector.service";
import { DistrictControllerService } from "src/app/services/district-controller.service";
import { TrainingControllerService } from "src/app/services/training-controller.service";

@Component({
    selector: "app-graph-group",
    templateUrl: "./graph-group.component.html",
    styleUrls: ["./graph-group.component.css"],
})
export class GraphGroupComponent implements OnInit, OnDestroy {
    // Must contain 2 graphs ->
    // 1.) Training corresponding to districts
    // 2.) training corresponding to time series,i.e, last 12 months
    trainingDistrictchart!: ApexCharts;
    trainingLastYearChart!: ApexCharts;

    // training corresponding to districts
    districtMapping: Map<number, string> = new Map();
    numberOfPatientsPerDistrictId: Map<number, number> = new Map();
    numberOfPatientsPerDistrict: Map<string, number | undefined> = new Map();

    // training corresponding to time series
    numberOfPatientsPerMonth: Map<string, number | undefined> = new Map();

    constructor(
        public backendConnectorService: BackendConnectorService,
        public districtControllerService: DistrictControllerService,
        public trainingControllerService: TrainingControllerService
    ) {}

    async ngOnInit() {
        await this.districtControllerService.initializeDistricts();
        await this.trainingControllerService.initializeTraining();

        // console.log(this.districtControllerService.getDistrictList());
        // console.log(this.trainingControllerService.getTrainingList());

        this.districtMapping = this.districtControllerService.getDistrictMap();
        this.numberOfPatientsPerDistrictId =
            this.trainingControllerService.getNumberOfPatientsPerDistrict();

        this.numberOfPatientsPerMonth =
            this.trainingControllerService.getNumberOfPatientsPerMonth();

        // console.log(this.districtMapping);
        // console.log(this.numberOfPatientsPerDistrictId);

        for (const [districtId, districtName] of this.districtMapping) {
            // console.log(districtId, districtName);
            this.numberOfPatientsPerDistrict.set(
                districtName,
                this.numberOfPatientsPerDistrictId.get(districtId)
            );
        }

        // console.log(this.numberOfPatientsPerDistrict);

        // training per district chart options
        const trainingDistrictOptions = {
            chart: {
                type: "bar",
                height: 400,
            },
            series: [
                {
                    name: "Number Of Patients",
                    data: Array.from(this.numberOfPatientsPerDistrict.values()),
                },
            ],
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                //add district name array.
                categories: Array.from(this.numberOfPatientsPerDistrict.keys()),
            },
            title: {
                text: "Number of participants per district for training events",
                align: "center",
            },
        };

        const trainingTimeMappingOptions = {
            chart: {
                type: "bar",
                height: 400,
            },
            series: [
                {
                    name: "Number Of Patients",
                    data: [...this.numberOfPatientsPerMonth.values()],
                },
            ],
            xaxis: {
                //add district name array.
                categories: [...this.numberOfPatientsPerMonth.keys()],
            },
            dataLabels: {
                enabled: false,
            },
            title: {
                text: "Number of participants per month for training events for last 12 months",
                align: "center",
            },
        };

        this.initTrainingChart(
            trainingDistrictOptions,
            trainingTimeMappingOptions
        );
    }

    ngOnDestroy(): void {
        if (this.trainingDistrictchart) {
            this.trainingDistrictchart.destroy();
        }

        if (this.trainingLastYearChart) {
            this.trainingLastYearChart.destroy();
        }
    }

    initTrainingChart(
        trainingDistrictOptions: any,
        trainingTimeMappingOptions?: any
    ): void {
        this.trainingDistrictchart = new ApexCharts(
            document.querySelector("#training1"),
            trainingDistrictOptions
        );
        this.trainingDistrictchart.render();

        this.trainingLastYearChart = new ApexCharts(
            document.querySelector("#training2"),
            trainingTimeMappingOptions
        );
        this.trainingLastYearChart.render();
    }
}
