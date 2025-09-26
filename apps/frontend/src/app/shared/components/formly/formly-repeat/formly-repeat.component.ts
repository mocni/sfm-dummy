import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FieldArrayType, FormlyModule } from "@ngx-formly/core";
import { MaterialModule } from "material.module";
import { TablerIconsModule } from "angular-tabler-icons";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "formly-repeat-section",
  standalone: true,
  imports: [FormlyModule, CommonModule, MaterialModule, TablerIconsModule, TranslateModule],
  templateUrl: "./formly-repeat.component.html",
})
export class RepeatTypeComponent extends FieldArrayType {}
