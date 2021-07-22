import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import * as ApexCharts from "apexcharts";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { BackendConnectorService } from "src/app/services/backend-connector.service";
import { DistrictControllerService } from "src/app/services/district-controller.service";
import { DistrictExpenseControllerService } from "src/app/services/district-expense-controller.service";
import { DistrictMNSControllerService } from "src/app/services/district-mns-controller.service";
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
    DistrictExpenseDistrictChart!: ApexCharts;
    DistrictExpenseLastYearChart!: ApexCharts;
    DistrictMNSChart!: ApexCharts;
    DistrictMNSLastYearChart!: ApexCharts;

    // training corresponding to districts
    numberOfPatientsPerDistrict: Map<string, number> = new Map();
    today: Date = new Date();
    todayLastYear: Date = new Date(
        new Date().setFullYear(this.today.getFullYear() - 1)
    );
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

    // training corresponding to time series
    numberOfPatientsPerMonth: Map<string, number> = new Map();
    MonthlyTrainingBody = {
        display: "ReportingMonthyear",
        group_by: "TrainingId",
        district_list: "",
        facility_list: "",
        event_list: "",
        target_group_list: "",
        resource_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "monthly",
        year_type: "c",
    };

    // DistrictExpense Corresponding to districts
    expensePerDistrict: Map<string, number> = new Map();
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

    // DistrictExpense corresponding to time series
    expensePerMonth: Map<string, number> = new Map();
    MonthlyExpenseBody = {
        display: "ReportingMonthYear",
        group_by: "BudgetExpenseId",
        agg: "TotalExpense",
        district_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "monthly",
        year_type: "c",
    };

    // District Manasadhara according to districts
    MnsPerDistrict: Map<string, number> = new Map();
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

    // District Manasadhara according to time series
    MnsPerMonth: Map<string, number> = new Map();
    MnsMonthBody = {
        display: "ReportingMonthYear",
        group_by: "MNSId",
        agg: "TotalExpense",
        district_list: "",
        status_list: "",
        start_date: this.todayLastYear.toISOString().slice(0, 10),
        end_date: this.today.toISOString().slice(0, 10),
        timeperiod_type: "monthly",
        year_type: "c",
    };

    constructor(
        public backendConnectorService: BackendConnectorService,
        public trainingControllerService: TrainingControllerService,
        public districtExpenseControllerService: DistrictExpenseControllerService,
        public districtMNSControllerService: DistrictMNSControllerService
    ) {}

    ngOnInit() {
        this.backendConnectorService
            .getTraining(this.districtTrainingBody)
            .subscribe((data: any) => {
                const trainingData = data[0];

                this.numberOfPatientsPerDistrict =
                    this.trainingControllerService.getDistrictPatientMap(
                        trainingData
                    );

                this.initTrainingCharts(
                    this.trainingDistrictchart,
                    this.createChartOptions(
                        this.numberOfPatientsPerDistrict,
                        "Number of Patients Per District"
                    ),
                    1
                );
            });

        this.backendConnectorService
            .getTraining(this.MonthlyTrainingBody)
            .subscribe((data: any) => {
                const trainingData = data[0];

                this.numberOfPatientsPerMonth =
                    this.trainingControllerService.getMonthlyPatientMap(
                        trainingData
                    );
                this.initTrainingCharts(
                    this.trainingDistrictchart,
                    this.createChartOptions(
                        this.numberOfPatientsPerMonth,
                        "Number of Patients Monthly"
                    ),
                    2
                );
            });

        this.backendConnectorService
            .getDistrictExpense(this.DistrictExpenseBody)
            .subscribe((data: any) => {
                // console.log(data);
                const expenseData = data[0];
                this.expensePerDistrict =
                    this.districtExpenseControllerService.getDistrictExpenseMap(
                        expenseData
                    );

                this.initDistrictExpenseCharts(
                    this.DistrictExpenseDistrictChart,
                    this.createDistrictExpenseChartOptions(
                        this.expensePerDistrict,
                        "Total Expense Per District (In Lakhs)"
                    ),
                    1
                );
            });

        this.backendConnectorService
            .getDistrictExpense(this.MonthlyExpenseBody)
            .subscribe((data: any) => {
                const expenseData = data[0];

                this.expensePerMonth =
                    this.districtExpenseControllerService.getMonthlyExpenseMap(
                        expenseData
                    );

                this.initDistrictExpenseCharts(
                    this.DistrictExpenseLastYearChart,
                    this.createDistrictExpenseChartOptions(
                        this.expensePerMonth,
                        "Total Expense Last Year monthly (In Lakhs)"
                    ),
                    2
                );
            });

        this.backendConnectorService
            .getDistrictManasadhara(this.MnsDistrictBody)
            .subscribe((data: any) => {
                const districtMNSData = data[0];

                this.MnsPerDistrict =
                    this.districtMNSControllerService.getDistrictMnsMap(
                        districtMNSData
                    );

                this.initDistrictMNSCharts(
                    this.DistrictMNSChart,
                    this.createDistrictMNSChartOptions(
                        this.MnsPerDistrict,
                        "Manasadhara Expense per District (for the last year)"
                    ),
                    1
                );
            });

        this.backendConnectorService
            .getDistrictManasadhara(this.MnsMonthBody)
            .subscribe((data: any) => {
                const districtMNSData = data[0];
                // console.log(districtMNSData);

                this.MnsPerMonth =
                    this.districtMNSControllerService.getMonthlyMNSMap(
                        districtMNSData
                    );

                this.initDistrictMNSCharts(
                    this.DistrictMNSLastYearChart,
                    this.createDistrictMNSChartOptions(
                        this.MnsPerMonth,
                        "Manasadhara Expense Last Year monthly (In Lakhs)"
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

    createDistrictExpenseChartOptions(
        valueMap: Map<string, number>,
        title: string
    ) {
        const chartOptions = {
            chart: {
                type: "bar",
                height: 400,
            },
            series: [
                {
                    name: "Total Expense",
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

    createDistrictMNSChartOptions(
        valueMap: Map<string, number>,
        title: string
    ) {
        const chartOptions = {
            chart: {
                type: "bar",
                height: 400,
            },
            series: [
                {
                    name: "Manasadhara Expense",
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

    initDistrictExpenseCharts(
        chart: ApexCharts,
        chartOptions: any,
        graphId: number
    ): void {
        chart = new ApexCharts(
            document.querySelector(`#districtExpense${graphId}`),
            chartOptions
        );
        chart.render();
    }

    initDistrictMNSCharts(
        chart: ApexCharts,
        chartOptions: any,
        graphId: number
    ) {
        chart = new ApexCharts(
            document.querySelector(`#districtMNS${graphId}`),
            chartOptions
        );
        chart.render();
    }
}
