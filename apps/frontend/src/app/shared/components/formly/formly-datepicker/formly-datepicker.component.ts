import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "material.module";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Moment } from "moment";

@Component({
  selector: "app-formly-datepicker",
  standalone: true,
  imports: [MaterialModule, TranslateModule, TablerIconsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./formly-datepicker.component.html",
  styleUrl: "./formly-datepicker.component.scss",
})
export class FormlyDatepickerComponent extends FieldType<FieldTypeConfig> {
  public getFormControl(): FormControl {
    return this.field.formControl as FormControl;
  }

  public onInputFocus(datepicker: MatDatepicker<Moment>): void {
    datepicker.open();
  }

  public onKeyDown() {
    return false;
  }
}
