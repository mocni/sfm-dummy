import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "material.module";

@Component({
  selector: "app-formly-address",
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule, TablerIconsModule, ReactiveFormsModule],
  templateUrl: "./formly-address.component.html",
  styleUrls: ["./formly-address.component.scss"],
})
export class FormlyAddressComponent extends FieldType {
  formGroup!: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }
  public getFormControl(path: string) {
    return this.field.formControl?.get(path) as FormControl;
  }
}
