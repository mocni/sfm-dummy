import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";

export const dispatchFormFields = (
  trucks: any[],
  trailers: any[],
  drivers: any[],
  translate: TranslateService,
): FormlyFieldConfig[] => [
  createFormlyFieldConfig({
    key: "truckId",
    type: "select",
    templateOptions: {
      label: "dispatch.views.form.truck.label",
      options: trucks.map((truck: any) => ({
        label: truck.registration_plate,
        value: truck.id,
      })),
      required: true,
    },
    className: "col-4",
    validation: {
      messages: {
        required: translate.instant("dispatch.views.form.truck.validationMessage"),
      },
    },
  }),

  createFormlyFieldConfig({
    key: "trailerId",
    type: "select",
    templateOptions: {
      label: "dispatch.views.form.trailer.label",
      options: trailers.map((trailer: any) => ({
        label: trailer.registration_plate,
        value: trailer.id,
      })),
      required: true,
    },
    validation: {
      messages: {
        required: translate.instant("dispatch.views.form.trailer.validationMessage"),
      },
    },
    className: "col-4",
  }),

  createFormlyFieldConfig({
    key: "employeeId",
    type: "select",
    templateOptions: {
      label: "dispatch.views.form.driver.label",
      options: drivers.map((driver: any) => ({
        label: `${driver.first_name} ${driver.last_name}`,
        value: driver.id,
      })),
      required: true,
    },
    validation: {
      messages: {
        required: translate.instant("dispatch.views.form.driver.validationMessage"),
      },
    },
    className: "col-4",
  }),
];
