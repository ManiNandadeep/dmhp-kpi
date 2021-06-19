import { Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";

@Component({
    selector: "app-graph-group",
    templateUrl: "./graph-group.component.html",
    styleUrls: ["./graph-group.component.css"],
})
export class GraphGroupComponent implements OnInit, OnDestroy {
    chart1!: ApexCharts;
    chart2!: ApexCharts;

    optionsChart = {
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

    ngOnDestroy(): void {
        if (this.chart1) {
            this.chart1.destroy();
        }

        if (this.chart2) {
            this.chart2.destroy();
        }
    }

    initChart() {
        this.chart1 = new ApexCharts(
            document.querySelector("#chart1"),
            this.optionsChart
        );
        this.chart1.render();

        this.chart2 = new ApexCharts(
            document.querySelector("#chart2"),
            this.optionsChart
        );
        this.chart2.render();
    }
}
