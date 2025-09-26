import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { trailerMakesArray } from "@smart-fleet-management/common";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";

export const trailerFormFields = (trailerTypes: any, translate: TranslateService): FormlyFieldConfig[] => [
  createFormlyFieldConfig({
    key: "make",
    type: "select",
    templateOptions: {
      label: "trailer.views.form.make.label",
      placeholder: "trailer.views.form.make.placeholder",
      required: true,
      options: trailerMakesArray.map((type: any) => ({
        label: type.id === "Other" ? translate.instant("trailer.enums.trailerTypes.OTHER") : type.name,
        value: type.id,
      })),
      icon: "truck-loading",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.make.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "registration_plate",
    type: "input",
    templateOptions: {
      label: "trailer.views.form.registration_plate.label",
      placeholder: "trailer.views.form.registration_plate.placeholder",
      required: true,
      icon: "dialpad",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.registration_plate.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "type",
    type: "select",
    templateOptions: {
      label: "trailer.views.form.type.label",
      required: false,
      options: trailerTypes.map((type: any) => ({
        label: translate.instant(`trailer.enums.trailerTypes.${type.name}`),
        value: type.id,
      })),
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "manufacture_date",
    type: "monthpicker",
    templateOptions: {
      label: "trailer.views.form.manufacture_date.label",
      placeholder: "trailer.views.form.manufacture_date.placeholder",
      required: false,
      icon: "truck-loading",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.manufacture_date.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "model",
    type: "input",
    templateOptions: {
      label: "trailer.views.form.model.label",
      placeholder: "trailer.views.form.model.placeholder",
      required: false,
      icon: "truck-loading",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.model.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "vin_number",
    type: "input",
    templateOptions: {
      label: "trailer.views.form.vin_number.label",
      placeholder: "trailer.views.form.vin_number.placeholder",
      required: false,
      icon: "dialpad",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.vin_number.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "periodicInspection",
    type: "datepicker",
    templateOptions: {
      label: "trailer.views.form.periodicInspection.label",
      placeholder: "trailer.views.form.periodicInspection.placeholder",
      required: false,
      icon: "user",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.periodicInspection.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "registrated_until",
    type: "monthpicker",
    templateOptions: {
      label: "trailer.views.form.registrated_until.label",
      placeholder: "",
      required: false,
      icon: "user",
    },
    validation: {
      messages: {
        required: translate.instant("trailer.views.form.registrated_until.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),
];
