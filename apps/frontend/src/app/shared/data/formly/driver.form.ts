import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";

export const driverForm = (translate: TranslateService): FormlyFieldConfig[] => {
  return [
    createFormlyFieldConfig({
      key: "name",
      type: "input",
      templateOptions: {
        label: "driver.views.form.name.label",
        placeholder: "driver.views.form.name.placeholder",
        required: true,
        icon: "user",
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.name.validationMessage"),
        },
      },
      className: "col-12 col-sm-6",
    }),

    createFormlyFieldConfig({
      key: "lastname",
      type: "input",
      templateOptions: {
        label: "driver.views.form.lastname.label",
        placeholder: "driver.views.form.lastname.placeholder",
        required: true,
        icon: "user",
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.lastname.validationMessage"),
        },
      },
      className: "col-12 col-sm-6",
    }),

    createFormlyFieldConfig({
      key: "createDriverUser.email",
      type: "input",
      templateOptions: {
        label: "driver.views.form.email.label",
        placeholder: "driver.views.form.email.placeholder",
        required: true,
        icon: "createAccount",
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.email.validationMessage"),
        },
      },
      className: "col-12 col-sm-12",
    }),

    createFormlyFieldConfig({
      key: "createAccount",
      type: "checkbox",
      templateOptions: {
        label: "driver.views.form.createUser.label",
      },
    }),

    createFormlyFieldConfig({
      key: "createDriverUser.username",
      type: "input",
      templateOptions: {
        label: "driver.views.form.username.label",
        placeholder: "driver.views.form.username.placeholder",
        required: true,
        icon: "createAccount",
        maxLength: 100,
      },
      expressionProperties: {
        // Conditionally set required if createAccount is true
        "templateOptions.required": (model: any) => model.createAccount,
        // Conditionally hide the field if createAccount is false
        "templateOptions.hidden": (model: any) => !model.createAccount,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.username.validationMessage"),
        },
      },
      className: "col-12 col-sm-12",
    }),

    createFormlyFieldConfig({
      className: "col-12 col-sm-12",
      key: "createDriverUser.password",
      type: "input",
      templateOptions: {
        label: "driver.views.form.password.label",
        placeholder: "driver.views.form.password.placeholder",
        required: true,
        icon: "password",
        maxLength: 100,
      },
      expressionProperties: {
        // Conditionally set required if createAccount is true
        "templateOptions.required": (model: any) => model.createAccount,
        // Conditionally hide the field if createAccount is false
        "templateOptions.hidden": (model: any) => !model.createAccount,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.password.validationMessage"),
        },
      },
    }),

    createFormlyFieldConfig({
      key: "oib",
      type: "input",
      templateOptions: {
        label: "driver.views.form.oib.label",
        placeholder: "driver.views.form.oib.placeholder",
        required: false,
        icon: "dialpad",
        maxLength: 20,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.oib.validationMessage"),
        },
      },
      className: "col-12",
    }),

    createFormlyFieldConfig({
      key: "driversLicenceNumber",
      type: "input",
      templateOptions: {
        label: "driver.views.form.driversLicenceNumber.label",
        placeholder: "driver.views.form.driversLicenceNumber.placeholder",
        required: false,
        icon: "dialpad",
        maxLength: 20,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.driversLicenceNumber.validationMessage"),
        },
      },
      className: "col-12",
    }),

    createFormlyFieldConfig({
      key: "driversLicenceValidationPeriod",
      type: "datepicker",
      templateOptions: {
        label: "driver.views.form.driversLicenceValidationPeriod.label",
        placeholder: "driver.views.form.driversLicenceValidationPeriod.placeholder",
        required: false,
        icon: "truck-loading",
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.driversLicenceValidationPeriod.validationMessage"),
        },
      },
      className: "col-12",
    }),

    createFormlyFieldConfig({
      key: "driversCardNumber",
      type: "input",
      templateOptions: {
        label: "driver.views.form.driversCardNumber.label",
        placeholder: "driver.views.form.driversCardNumber.placeholder",
        required: false,
        icon: "dialpad",
        maxLength: 20,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.driversCardNumber.validationMessage"),
        },
      },
      className: "col-12",
    }),

    createFormlyFieldConfig({
      key: "driversCardValidationPeriod",
      type: "datepicker",
      templateOptions: {
        label: "driver.views.form.driversCardValidationPeriod.label",
        placeholder: "driver.views.form.driversCardValidationPeriod.placeholder",
        required: false,
        icon: "truck-loading",
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.driversCardValidationPeriod.validationMessage"),
        },
      },
      className: "col-12",
    }),

    createFormlyFieldConfig({
      key: "telephoneNumber",
      type: "input",
      templateOptions: {
        label: "driver.views.form.telephoneNumber.label",
        placeholder: "driver.views.form.telephoneNumber.placeholder",
        required: false,
        icon: "phone",
        maxLength: 25,
      },
      validation: {
        messages: {
          required: translate.instant("driver.views.form.telephoneNumber.validationMessage"),
        },
      },
      className: "col-12",
    }),
  ];
};
