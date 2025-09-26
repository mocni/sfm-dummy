import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "material.module";

@Component({
  selector: "app-formly-checkbox",
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule, ReactiveFormsModule],
  templateUrl: "./formly-checkbox.component.html",
  styleUrl: "./formly-checkbox.component.scss",
})
export class FormlyCheckboxComponent extends FieldType {
  formGroup!: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }
  public getFormControl(): FormControl {
    return this.field.formControl as FormControl;
  }
}
