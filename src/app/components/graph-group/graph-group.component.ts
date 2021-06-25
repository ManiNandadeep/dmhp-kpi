import { Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";
import { BackendConnectorService } from "src/app/services/backend-connector.service";

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

    districts: number[] = [];
    districtMapping=new Map();
    numberOfPatientsPerDistrict: number[] = [];

    constructor(public backendConnectorService: BackendConnectorService) {}

    ngOnInit(): void {
        this.backendConnectorService
        .getDistricts()
        .subscribe((something: any)=>{
            // console.log(`${something.length}`);
            for(let j=0;j<something.length;j++){
                this.districtMapping.set(something[j].districtId,something[j].district);
            }
            // console.log(this.districtMapping);
        });
        this.backendConnectorService
            .getTrainingTable()
            .subscribe((trainingList: any) => {
                // delete later after confirming
                // console.log(`The length of the training list is ${trainingList.length}`);
                // convert into hashmap -> if you get time
                for (let i = 0; i < trainingList.length; ++i) {
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
                }
                this.numberOfPatientsPerDistrict=this.numberOfPatientsPerDistrict.slice(1);
                this.districts=this.districts.slice(1);
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
                // console.log(checkSum);

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
                        categories: Array.from(this.districtMapping.values()).slice(0,-1),
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    title: {
                        text: "Number of participants per district for training events",
                        align: "center",
                    },
                };

                this.initTrainingChart(trainingDistrictOptions);
            });
        
    }

    ngOnDestroy(): void {
        if (this.trainingDistrictchart) {
            this.trainingDistrictchart.destroy();
        }
    }

    initTrainingChart(trainingDistrictOptions: any): void {
        this.trainingDistrictchart = new ApexCharts(
            document.querySelector("#training1"),
            trainingDistrictOptions
        );
        this.trainingDistrictchart.render();
    }
}
