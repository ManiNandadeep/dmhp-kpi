import { Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";
import { BackendConnectorService } from "src/app/services/backend-connector.service";
import { DistrictControllerService } from "src/app/services/district-controller.service";

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
    districts: number[] = [];
    districtMapping: Map<number, string> = new Map();
    numberOfPatientsPerDistrict: number[] = [];

    // training corresponding to time series
    currentDate: Date = new Date();
    currentYear: number = this.currentDate.getFullYear();
    currentMonth: number = this.currentDate.getMonth();
    timeMapping: Date[] = [];
    monthMapping: number[] = [];
    numberOfPatientsPerMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    constructor(
        public backendConnectorService: BackendConnectorService,
        public districtControllerService: DistrictControllerService
    ) {
        console.log(this.currentDate);
        console.log(this.currentYear);
        console.log(this.currentMonth);

        // adding values to timeMapping array
        for (let i = 0; i > -12; --i) {
            let paddingMonth = this.currentMonth + i;
            this.timeMapping.push(new Date(2021, paddingMonth));
            let monthMap = paddingMonth < 0 ? 12 + paddingMonth : paddingMonth;
            this.monthMapping.push(monthMap);
        }

        console.log(this.monthMapping);
        console.log(this.timeMapping);
    }

    ngOnInit(): void {
        this.districtMapping =
            this.districtControllerService.getDistrictMapping();

        let districtList = this.districtControllerService.getDistrictList();
        console.log(districtList);
        // this.districtMapping.set(3000, "test string");
        // console.log(this.districtMapping);
        // console.log(this.districtControllerService.getDistrictMapping());

        this.backendConnectorService
            .getTrainingTable()
            .subscribe((trainingList: any) => {
                for (let i = 0; i < trainingList.length; ++i) {
                    // trainingDistrict For loop body
                    trainingList[i].eventFrom = new Date(
                        trainingList[i].eventFrom
                    );

                    trainingList[i].eventTo = new Date(trainingList[i].eventTo);
                    if (!this.districts.includes(trainingList[i].districtId)) {
                        this.districts.push(trainingList[i].districtId);
                        this.numberOfPatientsPerDistrict[
                            this.districts.indexOf(trainingList[i].districtId)
                        ] = trainingList[i].noOfPatients;
                    } else {
                        this.numberOfPatientsPerDistrict[
                            this.districts.indexOf(trainingList[i].districtId)
                        ] += trainingList[i].noOfPatients;
                    }

                    // training timeMapping for loop body
                    if (
                        trainingList[i].eventFrom.getFullYear() ===
                            this.currentYear ||
                        trainingList[i].eventFrom.getFullYear() ===
                            this.currentYear - 1
                    ) {
                        this.numberOfPatientsPerMonth[
                            this.monthMapping.indexOf(
                                trainingList[i].eventFrom.getMonth()
                            )
                        ] += trainingList[i].noOfPatients;
                    }
                }

                console.log(this.numberOfPatientsPerMonth);

                this.numberOfPatientsPerDistrict =
                    this.numberOfPatientsPerDistrict.slice(1);
                this.districts = this.districts.slice(1);

                // check statements
                console.log(this.districts);
                console.log(this.numberOfPatientsPerDistrict);

                // put this in testing module
                let checkSum = 0;
                for (
                    let i = 0;
                    i < this.numberOfPatientsPerDistrict.length;
                    ++i
                ) {
                    checkSum += this.numberOfPatientsPerDistrict[i];
                }

                checkSum = 0;
                for (let i = 0; i < this.numberOfPatientsPerMonth.length; ++i) {
                    checkSum += this.numberOfPatientsPerMonth[i];
                }
                console.log(checkSum);

                // training per district chart options
                const trainingDistrictOptions = {
                    chart: {
                        type: "bar",
                        height: 400,
                    },
                    series: [
                        {
                            name: "Number Of Patients",
                            data: this.numberOfPatientsPerDistrict,
                        },
                    ],
                    xaxis: {
                        //add district name array.
                        categories: Array.from(
                            this.districtMapping.values()
                        ).slice(0, -1),
                    },
                    dataLabels: {
                        enabled: false,
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
                            data: this.numberOfPatientsPerMonth,
                        },
                    ],
                    xaxis: {
                        //add district name array.
                        categories: this.timeMapping,
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
            });
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
        trainingTimeMappingOptions: any
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
