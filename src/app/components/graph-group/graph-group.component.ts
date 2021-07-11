import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";
import { from } from "rxjs";
import { map } from "rxjs/operators";
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
    numberOfPatientsPerDistrict: Map<string, number> = new Map();

    // training corresponding to time series
    numberOfPatientsPerMonth: Map<string, number> = new Map();

    constructor(
        public backendConnectorService: BackendConnectorService,
        public trainingControllerService: TrainingControllerService
    ) {}

    ngOnInit() {
        this.backendConnectorService
            .getTraining(
                this.trainingControllerService.getBodyParams("monthly", "c")
            )
            .subscribe((data: any) => {
                const trainingData = data[0];
                console.log(trainingData);
                console.log(data);

                this.numberOfPatientsPerDistrict =
                    this.trainingControllerService.getDistrictPatientMap(
                        trainingData
                    );

                this.numberOfPatientsPerMonth =
                    this.trainingControllerService.getMonthlyPatientMap(
                        trainingData
                    );

                this.initTrainingCharts(
                    this.trainingDistrictchart,
                    this.createChartOptions(
                        this.numberOfPatientsPerDistrict,
                        "Number of participants per district for training events"
                    ),
                    1
                );

                this.initTrainingCharts(
                    this.trainingLastYearChart,
                    this.createChartOptions(
                        this.numberOfPatientsPerMonth,
                        "Number of participants last year monthly"
                    ),
                    2
                );
            });
    }

    ngOnDestroy() {}

    createChartOptions(valueMap: Map<string, number>, title: string) {
        const chartOptions = {
            chart: {
                type: "bar",
                height: 400,
            },
            series: [
                {
                    name: "Number Of Patients",
                    data: Array.from(valueMap.values()),
                },
            ],
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                //add district name array.
                categories: Array.from(valueMap.keys()),
            },
            title: {
                text: title,
                align: "center",
            },
        };
        return chartOptions;
    }

    initTrainingCharts(
        chart: ApexCharts,
        chartOptions: any,
        graphId: number
    ): void {
        chart = new ApexCharts(
            document.querySelector(`#training${graphId}`),
            chartOptions
        );
        chart.render();
    }
}
