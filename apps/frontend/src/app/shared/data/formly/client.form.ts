import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";
import { countries } from "../country.data";

export const clientForm = (translate: TranslateService): FormlyFieldConfig[] => {
  return [
    createFormlyFieldConfig({
      key: "name",
      type: "input",
      templateOptions: {
        icon: "user",
        label: "client.views.form.name.label",
        placeholder: "client.views.form.name.placeholder",
        required: true,
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("client.views.form.name.validationMessage"),
        },
      },
      className: "col-12 m-b-16",
    }),
    createFormlyFieldConfig({
      key: "vat_number",
      type: "input",
      templateOptions: {
        icon: "dialpad",
        label: "client.views.form.vat_number.label",
        placeholder: "client.views.form.vat_number.placeholder",
        required: true,
        minLength: 6,
        maxLength: 20,
      },
      validation: {
        messages: {
          required: translate.instant("client.views.form.vat_number.validationMessage"),
        },
      },
      className: "col-12 m-b-16",
    }),
    {
      key: "address",
      templateOptions: {
        label: translate.instant("addressForm.label"),
      },
      className: "col-12 m-b-16",
      fieldGroup: [
        createFormlyFieldConfig({
          key: "country",
          type: "select",
          templateOptions: {
            label: "COMPANY_SETTINGS.FORM.ADDRESS.COUNTRY.LABEL",
            placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.COUNTRY.PLACEHOLDER",
            required: true,
            translate: true,
            options: countries,
            icon: "flag",
          },
          validation: {
            messages: {
              required: translate.instant("COMPANY_SETTINGS.FORM.ADDRESS.COUNTRY.VALIDATION_MESSAGE"),
            },
          },
          className: "col-12 m-b-16",
        }),
        createFormlyFieldConfig({
          key: "street",
          type: "input",
          templateOptions: {
            icon: "road",
            label: "addressForm.street.label",
            placeholder: "addressForm.street.placeholder",
            required: true,
            maxLength: 100,
          },
          validation: {
            messages: {
              required: translate.instant("addressForm.street.validationMessage"),
            },
          },
          className: "col-8 m-b-16",
        }),
        createFormlyFieldConfig({
          key: "house_number",
          type: "input",
          templateOptions: {
            icon: "home",
            label: "addressForm.house_number.label",
            placeholder: "addressForm.house_number.placeholder",
            required: true,
            maxLength: 100,
          },
          validation: {
            messages: {
              required: translate.instant("addressForm.house_number.validationMessage"),
            },
          },
          className: "col-4 m-b-16",
        }),
        createFormlyFieldConfig({
          key: "city",
          type: "input",
          templateOptions: {
            icon: "building",
            label: "addressForm.city.label",
            placeholder: "addressForm.city.placeholder",
            required: true,
            maxLength: 100,
          },
          validation: {
            messages: {
              required: translate.instant("addressForm.city.validationMessage"),
            },
          },
          className: "col-8 m-b-16",
        }),
        createFormlyFieldConfig({
          key: "postal_code",
          type: "input",
          templateOptions: {
            icon: "map-pin",
            label: "addressForm.postal_code.label",
            placeholder: "addressForm.postal_code.placeholder",
            required: true,
            maxLength: 100,
          },
          validation: {
            messages: {
              required: translate.instant("addressForm.postal_code.validationMessage"),
            },
          },
          className: "col-4 m-b-16",
        }),
      ],
    },
    createFormlyFieldConfig({
      key: "email",
      type: "input",
      templateOptions: {
        icon: "mail",
        label: "client.views.form.email.label",
        placeholder: "client.views.form.email.placeholder",
        required: false,
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("client.views.form.email.validationMessage"),
        },
      },
      className: "col-12 m-b-16",
    }),
    createFormlyFieldConfig({
      key: "mobile_number",
      type: "input",
      templateOptions: {
        icon: "phone",
        label: "client.views.form.mobile_number.label",
        placeholder: "client.views.form.mobile_number.placeholder",
        required: false,
        maxLength: 100,
      },
      validation: {
        messages: {
          required: translate.instant("client.views.form.mobile_number.validationMessage"),
        },
      },
      className: "col-12 m-b-16",
    }),
  ];
};
