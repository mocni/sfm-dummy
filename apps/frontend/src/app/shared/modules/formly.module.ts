import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FORMLY_CONFIG, FormlyField, FormlyFieldConfig, FormlyForm, FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyInputComponent } from "../components/formly/formly-input/formly-input.component";
import { FormlyAddressComponent } from "../components/formly/formly-address/formly-address.component";
import { FormlyDatepickerComponent } from "../components/formly/formly-datepicker/formly-datepicker.component";
import { FormlyDropdownComponent } from "../components/formly/formly-dropdown/formly-dropdown.component";
import { FormlyCheckboxComponent } from "../components/formly/formly-checkbox/formly-checkbox.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormlyMonthpickerComponent } from "../components/formly/formly-monthpicker/formly-monthpicker.component";
import { FormlyTitleComponent } from "../components/formly/formly-title/formly-title.component";
import { RepeatTypeComponent } from "../components/formly/formly-repeat/formly-repeat.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormlyBootstrapModule, FormlyModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: (translate: TranslateService) => ({
        types: [
          { name: "input", component: FormlyInputComponent },
          { name: "datepicker", component: FormlyDatepickerComponent },
          { name: "monthpicker", component: FormlyMonthpickerComponent },
          { name: "select", component: FormlyDropdownComponent },
          { name: "address", component: FormlyAddressComponent },
          { name: "checkbox", component: FormlyCheckboxComponent },
          { name: "title", component: FormlyTitleComponent },
          { name: "repeat", component: RepeatTypeComponent },
        ],
        validationMessages: [
          {
            name: "maxlength",
            message: (error: any, field: FormlyFieldConfig) => {
              return translate.instant("form.maxLengthError", { max: field.templateOptions?.maxLength });
            },
          },
          {
            name: "minlength",
            message: (error: any, field: FormlyFieldConfig) => {
              return translate.instant("form.minLengthError", { max: field.templateOptions?.minLength });
            },
          },
        ],
      }),
      deps: [TranslateService],
    },
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FormlyBootstrapModule, FormlyForm],
})
export class FormlySharedModule {}
