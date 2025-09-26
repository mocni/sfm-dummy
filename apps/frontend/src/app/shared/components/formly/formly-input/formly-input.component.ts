import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "material.module";

@Component({
  selector: "app-formly-input",
  standalone: true,
  imports: [MaterialModule, TranslateModule, TablerIconsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./formly-input.component.html",
  styleUrl: "./formly-input.component.scss",
})
export class FormlyInputComponent extends FieldType<FieldTypeConfig> {
  public getFormControl(): FormControl {
    return this.field.formControl as FormControl;
  }
}
