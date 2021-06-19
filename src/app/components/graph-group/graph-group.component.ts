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
    chart3!: ApexCharts;
    chart4!: ApexCharts;
    chart5!: ApexCharts;
    chart6!: ApexCharts;

    optionsRadar = {
        chart:{
            type: 'radar'
        },
        series: [
          {
            name: "Radar Series 1",
            data: [45, 52, 38, 24, 33, 10]
          },
          {
            name: "Radar Series 2",
            data: [26, 21, 20, 6, 8, 15]
          }
        ],
        labels: ['April', 'May', 'June', 'July', 'August', 'September']
      }

    optionsDonut = {
        chart: {
          type: 'donut'
        },
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']

    }
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
        if (this.chart3) {
            this.chart3.destroy();
        }
        if (this.chart3) {
            this.chart3.destroy();
        }
        if (this.chart4) {
            this.chart4.destroy();
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
        
        this.chart3=new ApexCharts(
            document.querySelector("#chart3"),
            this.optionsDonut
        );
        this.chart3.render();

        this.chart4=new ApexCharts(
            document.querySelector("#chart4"),
            this.optionsRadar
        );
        this.chart4.render();

    }
}
