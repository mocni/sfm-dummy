import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatDatepickerModule, MatDatepicker } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";
import { default as _rollupMoment, Moment } from "moment";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-formly-monthpicker",
  standalone: true,
  templateUrl: "./formly-monthpicker.component.html",
  styleUrl: "./formly-monthpicker.component.scss",
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyMonthpickerComponent extends FieldType<FieldTypeConfig> implements AfterContentChecked {
  public getFormControl(): FormControl {
    return this.field.formControl as FormControl;
  }
  date = new FormControl();

  ngAfterContentChecked() {
    this.date.patchValue(this.field.formControl.value ? moment(this.field.formControl.value, "MM/YYYY") : undefined);
  }

  public setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();

    // Convert the plain JavaScript Date object to a Moment instance
    const momentMonthYear = moment(normalizedMonthAndYear);

    // Update the month and year on the Moment control value
    ctrlValue.month(momentMonthYear.month());
    ctrlValue.year(momentMonthYear.year());

    // Add 1 to the month to fix zero-based indexing
    const formattedValue = `${ctrlValue.month() + 1}/${ctrlValue.year()}`;
    this.getFormControl().patchValue(formattedValue);
    this.date.setValue(ctrlValue);
    // Close the datepicker
    datepicker.close();
  }

  public onInputFocus(datepicker: MatDatepicker<Moment>): void {
    datepicker.open();
  }

  public onKeyDown() {
    return false;
  }
}
