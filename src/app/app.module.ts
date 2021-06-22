import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialDesignModule } from "./material-design/material-design.module";

import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { CardGroupComponent } from "./components/card-group/card-group.component";
import { GraphGroupComponent } from "./components/graph-group/graph-group.component";

@NgModule({
    declarations: [
        AppComponent,
        NavbarTopComponent,
        CardGroupComponent,
        GraphGroupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialDesignModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
