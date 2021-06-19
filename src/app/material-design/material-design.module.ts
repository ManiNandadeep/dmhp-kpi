import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

const materialComponents = [MatButtonModule, MatCardModule];

@NgModule({
    declarations: [],
    imports: [CommonModule, materialComponents],
    exports: [materialComponents],
})
export class MaterialDesignModule {}
