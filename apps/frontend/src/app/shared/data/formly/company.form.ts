import { FormlyFieldConfig } from "@ngx-formly/core";
import { TranslateService } from "@ngx-translate/core";
import { InvoiceNumberSeparator } from "@smart-fleet-management/common";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";
import { countries } from "../country.data";

export const companyFormFields = (translate: TranslateService): FormlyFieldConfig[] => [
  // Company Basic Information
  createFormlyFieldConfig({
    key: "name",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.NAME.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.NAME.PLACEHOLDER",
      required: true,
      icon: "building",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.NAME.VALIDATION_MESSAGE"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "oib",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.OIB.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.OIB.PLACEHOLDER",
      required: true,
      icon: "id",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.OIB.VALIDATION_MESSAGE"),
      },
    },
    className: "col-12 m-b-16",
  }),

  // Address Information
  createFormlyFieldConfig({
    key: "address.street",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.ADDRESS.STREET.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.STREET.PLACEHOLDER",
      required: true,
      icon: "map-pin",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.ADDRESS.STREET.VALIDATION_MESSAGE"),
      },
    },
    className: "col-12 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "address.house_number",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.ADDRESS.HOUSE_NUMBER.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.HOUSE_NUMBER.PLACEHOLDER",
      required: true,
      icon: "home",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.ADDRESS.HOUSE_NUMBER.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "address.postal_code",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.ADDRESS.POSTAL_CODE.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.POSTAL_CODE.PLACEHOLDER",
      required: true,
      icon: "mail",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.ADDRESS.POSTAL_CODE.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "address.city",
    type: "input",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.ADDRESS.CITY.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.CITY.PLACEHOLDER",
      required: true,
      icon: "map-pin",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.ADDRESS.CITY.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "address.country",
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
    className: "col-6 m-b-16",
  }),

  // Geolocation Information (Optional)
  /* 
  createFormlyFieldConfig({
    key: "address.geolocation.latitude",
    type: "input",
    templateOptions: {
      type: "number",
      label: "COMPANY_SETTINGS.FORM.ADDRESS.GEOLOCATION.LATITUDE.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.GEOLOCATION.LATITUDE.PLACEHOLDER",
      required: false,
      icon: "map-pin",
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "address.geolocation.longitude",
    type: "input",
    templateOptions: {
      type: "number",
      label: "COMPANY_SETTINGS.FORM.ADDRESS.GEOLOCATION.LONGITUDE.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.ADDRESS.GEOLOCATION.LONGITUDE.PLACEHOLDER",
      required: false,
      icon: "map-pin",
    },
    className: "col-6 m-b-16",
  }),
  */

  createFormlyFieldConfig({
    key: "spacingTitle",
    type: "title",
    templateOptions: {
      type: "number",
      label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS_TITLE",
    },
    className: "col-12 m-b-16",
  }),

  // Invoice Settings
  createFormlyFieldConfig({
    key: "invoice_settings.vat_percentage",
    type: "input",
    templateOptions: {
      type: "number",
      label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_PERCENTAGE.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_PERCENTAGE.PLACEHOLDER",
      required: false,
      icon: "percentage",
    },
    validation: {
      messages: {
        required: translate.instant("COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_PERCENTAGE.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "invoice_settings.invoice_number_separator",
    type: "select",
    templateOptions: {
      label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.LABEL",
      placeholder: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.PLACEHOLDER",
      required: false,
      translate: true,
      options: [
        {
          label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.OPTIONS.DASH",
          value: InvoiceNumberSeparator.DASH,
        },
        {
          label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.OPTIONS.DOT",
          value: InvoiceNumberSeparator.DOT,
        },
        {
          label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.OPTIONS.SLASH",
          value: InvoiceNumberSeparator.SLASH,
        },
      ],
      icon: "separator",
    },
    validation: {
      messages: {
        required: translate.instant(
          "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.INVOICE_NUMBER_SEPARATOR.VALIDATION_MESSAGE",
        ),
      },
    },
    className: "col-6 m-b-16",
  }),

  {
    key: "invoice_settings.vat_description",
    type: "repeat",
    props: {
      label: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.TITLE",
      addText: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.ADD_BUTTON",
      itemTitleKey: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.ITEM_TITLE",
      removeButtonKey: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.REMOVE_BUTTON",
      emptyStateKey: "COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.EMPTY_STATE",
    },
    fieldArray: {
      fieldGroup: [
        {
          key: "description",
          type: "input",
          templateOptions: {
            label: translate.instant("COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.LABEL"),
            placeholder: translate.instant("COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.PLACEHOLDER"),
            required: true,
            rows: 3,
            icon: "file-description",
          },
          validation: {
            messages: {
              required: translate.instant("COMPANY_SETTINGS.FORM.INVOICE_SETTINGS.VAT_DESCRIPTION.VALIDATION_MESSAGE"),
            },
          },
          className: "col-12 m-b-16",
        },
      ],
    },
    className: "col-12 m-b-16",
  },
];
