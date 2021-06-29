import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "dmhp-kpi";

    constructor() {}

    ngOnInit() {
        // await this.districtControllerService.initializeDistricts();
        // console.log("In app component");
    }
}
