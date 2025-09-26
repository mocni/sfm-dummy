import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";
import { FormlySelectModule } from "@ngx-formly/core/select";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "material.module";

@Component({
  selector: "app-formly-dropdown",
  standalone: true,
  imports: [
    MaterialModule,
    TranslateModule,
    TablerIconsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormlySelectModule,
  ],
  templateUrl: "./formly-dropdown.component.html",
  styleUrl: "./formly-dropdown.component.scss",
})
export class FormlyDropdownComponent extends FieldType<FieldTypeConfig> {
  public getFormControl(): FormControl {
    console.log(this);
    return this.field.formControl as FormControl;
  }
}
