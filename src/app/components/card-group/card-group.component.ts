import { Component, OnInit } from "@angular/core";
import { BackendConnectorService } from "src/app/services/backend-connector.service";

@Component({
    selector: "app-card-group",
    templateUrl: "./card-group.component.html",
    styleUrls: ["./card-group.component.css"],
})
export class CardGroupComponent implements OnInit {
    constructor(public backendConnectorService: BackendConnectorService) {}

    ngOnInit(): void {}
}
