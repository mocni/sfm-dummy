import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { TruckMakesArray } from "@smart-fleet-management/common";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";

export const truckFormFields = (truckModels: any, translate: TranslateService): FormlyFieldConfig[] => [
  createFormlyFieldConfig({
    key: "make",
    type: "select",
    templateOptions: {
      label: "truck.views.form.make.label",
      placeholder: "truck.views.form.make.placeholder",
      required: true,
      options: TruckMakesArray.map((type: any) => ({
        label: type.id === "Other" ? translate.instant("trailer.enums.trailerTypes.OTHER") : type.name,
        value: type.id,
      })),
      icon: "truck-delivery",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.make.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "registration_plate",
    type: "input",
    templateOptions: {
      label: "truck.views.form.registration_plate.label",
      placeholder: "truck.views.form.registration_plate.placeholder",
      required: true,
      icon: "dialpad",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.registration_plate.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "type",
    type: "select",
    templateOptions: {
      label: "truck.views.form.type.label",
      options: truckModels.map((type: any) => ({
        label: translate.instant(`truck.enums.truckTypes.${type.name}`),
        value: type.id,
      })),
      required: false,
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "manufacture_date",
    type: "monthpicker",
    templateOptions: {
      label: "truck.views.form.manufacture_date.label",
      placeholder: "truck.views.form.manufacture_date.placeholder",
      required: false,
      icon: "truck-loading",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.manufacture_date.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "model",
    type: "input",
    templateOptions: {
      label: "truck.views.form.model.label",
      placeholder: "truck.views.form.model.placeholder",
      required: false,
      icon: "truck-delivery",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.model.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "vin_number",
    type: "input",
    templateOptions: {
      label: "truck.views.form.vin_number.label",
      placeholder: "truck.views.form.vin_number.placeholder",
      required: false,
      icon: "dialpad",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.vin_number.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "registrated_until",
    type: "monthpicker",
    templateOptions: {
      label: "truck.views.form.registrated_until.label",
      placeholder: "",
      required: false,
      icon: "truck-loading",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.registrated_until.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "color",
    type: "input",
    templateOptions: {
      label: "truck.views.form.color.label",
      placeholder: "truck.views.form.color.placeholder",
      required: false,
      icon: "palette",
    },
    validation: {
      messages: {
        required: translate.instant("truck.views.form.color.validationMessage"),
      },
    },
    className: "col-12 m-b-16",
  }),
];
