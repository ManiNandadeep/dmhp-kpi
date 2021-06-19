import { Component, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";

@Component({
    selector: "app-graph-group",
    templateUrl: "./graph-group.component.html",
    styleUrls: ["./graph-group.component.css"],
})
export class GraphGroupComponent implements OnInit {
    optionsChart1 = {
        chart: {
            type: "line",
        },
        series: [
            {
                name: "sales",
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
    };

    constructor() {}

    ngOnInit(): void {
        this.initChart();
    }

    initChart() {
        let chart1 = new ApexCharts(
            document.querySelector("#chart1"),
            this.optionsChart1
        );

        chart1.render();
    }
}
