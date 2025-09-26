import { FormlyFieldConfig } from "@ngx-formly/core";
import { CreateEmployeePayloadDtoTypeEnum } from "@models/createEmployeePayloadDto";
import { createFormlyFieldConfig } from "app/shared/helpers/formly-field";
import { TranslateService } from "@ngx-translate/core";
import { CreateEmployeeResponseDto } from "@models/createEmployeeResponseDto";

export const employeeFormFields = (
  translate: TranslateService,
  isMyProfile: boolean = false,
  isUserCreationData: boolean = false,
): FormlyFieldConfig[] => [
  // Employee Type Selection (Required)

  createFormlyFieldConfig({
    key: "type",
    type: "select",
    templateOptions: {
      label: "USER_SETTINGS.FORM.TYPE.LABEL",
      placeholder: "USER_SETTINGS.FORM.TYPE.PLACEHOLDER",
      required: true,
      icon: "user",
      translate: true,
      options: [
        {
          label: "USER_SETTINGS.FORM.TYPE.OPTIONS.OWNER",
          value: CreateEmployeePayloadDtoTypeEnum.OWNER,
        },
        {
          label: "USER_SETTINGS.FORM.TYPE.OPTIONS.DRIVER",
          value: CreateEmployeePayloadDtoTypeEnum.DRIVER,
        },
        {
          label: "USER_SETTINGS.FORM.TYPE.OPTIONS.ACCOUNTANT",
          value: CreateEmployeePayloadDtoTypeEnum.ACCOUNTANT,
        },
      ],
    },
    validation: {
      messages: {
        required: "USER_SETTINGS.FORM.TYPE.VALIDATION_MESSAGE",
      },
    },
    className: "col-12 m-b-16",
  }),

  // Basic Information (Required)
  createFormlyFieldConfig({
    key: "first_name",
    type: "input",
    templateOptions: {
      label: "USER_SETTINGS.FORM.FIRST_NAME.LABEL",
      placeholder: "USER_SETTINGS.FORM.FIRST_NAME.PLACEHOLDER",
      required: true,
      icon: "user",
      maxLength: 100,
    },
    validation: {
      messages: {
        required: translate.instant("USER_SETTINGS.FORM.FIRST_NAME.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "last_name",
    type: "input",
    templateOptions: {
      label: "USER_SETTINGS.FORM.LAST_NAME.LABEL",
      placeholder: "USER_SETTINGS.FORM.LAST_NAME.PLACEHOLDER",
      required: true,
      icon: "user",
      maxLength: 100,
    },
    validation: {
      messages: {
        required: translate.instant("USER_SETTINGS.FORM.LAST_NAME.VALIDATION_MESSAGE"),
      },
    },
    className: "col-6 m-b-16",
  }),

  // Account creation fields (when isMyProfile is false)
  ...(isMyProfile
    ? []
    : [
        // Only show checkbox when isUserCreationData is false (creating new employee)
        ...(isUserCreationData
          ? []
          : [
              createFormlyFieldConfig({
                key: "create_user",
                type: "checkbox",
                templateOptions: {
                  label: "driver.views.form.createUser.label",
                },
                className: "col-12 m-b-16",
              }),
            ]),

        createFormlyFieldConfig({
          key: "user_creation_data.email",
          type: "input",
          templateOptions: {
            label: "driver.views.form.email.label",
            placeholder: "driver.views.form.email.placeholder",
            required: true,
            icon: "createAccount",
            maxLength: 100,
          },
          expressionProperties: {
            // When isUserCreationData is true, always show and require
            // When isUserCreationData is false, conditionally show based on create_user checkbox
            "templateOptions.required": (model: CreateEmployeeResponseDto) => isUserCreationData || model.create_user,
            "templateOptions.hidden": (model: CreateEmployeeResponseDto) => !isUserCreationData && !model.create_user,
            className: (model: CreateEmployeeResponseDto) =>
              isUserCreationData || model.create_user ? "col-12 col-sm-12 m-b-16" : "col-12 col-sm-12",
          },
          validation: {
            messages: {
              required: translate.instant("driver.views.form.email.validationMessage"),
            },
          },
        }),

        createFormlyFieldConfig({
          key: "user_creation_data.username",
          type: "input",
          templateOptions: {
            label: "driver.views.form.username.label",
            placeholder: "driver.views.form.username.placeholder",
            required: true,
            icon: "createAccount",
            maxLength: 100,
          },
          expressionProperties: {
            // When isUserCreationData is true, always show and require
            // When isUserCreationData is false, conditionally show based on create_user checkbox
            "templateOptions.required": (model: CreateEmployeeResponseDto) => isUserCreationData || model.create_user,
            "templateOptions.hidden": (model: CreateEmployeeResponseDto) => !isUserCreationData && !model.create_user,
            className: (model: CreateEmployeeResponseDto) =>
              isUserCreationData || model.create_user ? "col-12 col-sm-12 m-b-16" : "col-12 col-sm-12",
          },
          validation: {
            messages: {
              required: translate.instant("driver.views.form.username.validationMessage"),
            },
          },
        }),

        createFormlyFieldConfig({
          className: "col-12 col-sm-12",
          key: "user_creation_data.password",
          type: "input",
          templateOptions: {
            label: "driver.views.form.password.label",
            placeholder: "driver.views.form.password.placeholder",
            required: true,
            icon: "password",
            maxLength: 100,
          },
          expressionProperties: {
            // When isUserCreationData is true, always show and require
            // When isUserCreationData is false, conditionally show based on create_user checkbox
            "templateOptions.required": (model: CreateEmployeeResponseDto) => isUserCreationData || model.create_user,
            "templateOptions.hidden": (model: CreateEmployeeResponseDto) => !isUserCreationData && !model.create_user,
            className: (model: CreateEmployeeResponseDto) =>
              isUserCreationData || model.create_user ? "col-12 col-sm-12 m-b-16" : "col-12 col-sm-12",
          },
          validation: {
            messages: {
              required: translate.instant("driver.views.form.password.validationMessage"),
            },
          },
        }),
      ]),

  // Optional Information
  createFormlyFieldConfig({
    key: "oib",
    type: "input",
    templateOptions: {
      label: "USER_SETTINGS.FORM.OIB.LABEL",
      placeholder: "USER_SETTINGS.FORM.OIB.PLACEHOLDER",
      required: false,
      icon: "id",
      maxLength: 20,
    },
    className: "col-6 m-b-16",
  }),

  createFormlyFieldConfig({
    key: "phone_number",
    type: "input",
    templateOptions: {
      label: "USER_SETTINGS.FORM.PHONE_NUMBER.LABEL",
      placeholder: "USER_SETTINGS.FORM.PHONE_NUMBER.PLACEHOLDER",
      required: false,
      icon: "phone",
      maxLength: 25,
    },
    className: "col-6 m-b-16",
  }),

  // Driver-specific fields (conditional)
  createFormlyFieldConfig({
    key: "driver_licence_number",
    type: "input",
    templateOptions: {
      label: "driver.views.form.driversLicenceNumber.label",
      placeholder: "driver.views.form.driversLicenceNumber.placeholder",
      required: false,
      icon: "license",
      maxLength: 20,
    },
    expressionProperties: {
      "templateOptions.hidden": "model.type !== 'DRIVER'",
      "templateOptions.required": "model.type === 'DRIVER'",
      className: (model: CreateEmployeeResponseDto) => (model.type === "DRIVER" ? "col-6" : ""),
    },
    validation: {
      messages: {
        required: translate.instant("driver.views.form.driversLicenceNumber.validationMessage"),
      },
    },
  }),

  createFormlyFieldConfig({
    key: "driver_licence_validation_period",
    type: "datepicker",
    templateOptions: {
      label: "driver.views.form.driversLicenceValidationPeriod.label",
      placeholder: "driver.views.form.driversLicenceValidationPeriod.placeholder",
      required: false,
      icon: "calendar",
    },
    expressionProperties: {
      "templateOptions.hidden": "model.type !== 'DRIVER'",
      "templateOptions.required": "model.type === 'DRIVER'",
      className: (model: CreateEmployeeResponseDto) => (model.type === "DRIVER" ? "col-6" : ""),
    },
    validation: {
      messages: {
        required: translate.instant("driver.views.form.driversLicenceValidationPeriod.validationMessage"),
      },
    },
  }),

  createFormlyFieldConfig({
    key: "driver_card_number",
    type: "input",
    templateOptions: {
      label: "driver.views.form.driversCardNumber.label",
      placeholder: "driver.views.form.driversCardNumber.placeholder",
      required: false,
      icon: "credit-card",
      maxLength: 20,
    },
    expressionProperties: {
      "templateOptions.hidden": "model.type !== 'DRIVER'",
      className: (model: CreateEmployeeResponseDto) => (model.type === "DRIVER" ? "col-6" : ""),
    },
    validation: {
      messages: {
        required: translate.instant("driver.views.form.driversCardNumber.validationMessage"),
      },
    },
  }),

  createFormlyFieldConfig({
    key: "driver_card_validation_period",
    type: "datepicker",
    templateOptions: {
      label: "driver.views.form.driversCardValidationPeriod.label",
      placeholder: "driver.views.form.driversCardValidationPeriod.placeholder",
      required: false,
      icon: "calendar",
    },
    expressionProperties: {
      "templateOptions.hidden": "model.type !== 'DRIVER'",
      "templateOptions.required": "model.type === 'DRIVER'",
      className: (model: CreateEmployeeResponseDto) => (model.type === "DRIVER" ? "col-6" : ""),
    },
    validation: {
      messages: {
        required: translate.instant("driver.views.form.driversCardValidationPeriod.validationMessage"),
      },
    },
  }),

  // Company Cards Section
  {
    key: "company_cards",
    type: "repeat",
    props: {
      label: "USER_SETTINGS.FORM.COMPANY_CARDS.LABEL",
      addText: "USER_SETTINGS.FORM.COMPANY_CARDS.ADD_BUTTON",
      itemTitleKey: "USER_SETTINGS.FORM.COMPANY_CARDS.ITEM_TITLE",
      removeButtonKey: "USER_SETTINGS.FORM.COMPANY_CARDS.REMOVE_BUTTON",
      emptyStateKey: "USER_SETTINGS.FORM.COMPANY_CARDS.EMPTY_STATE",
    },
    fieldArray: {
      fieldGroup: [
        {
          key: "name",
          type: "input",
          templateOptions: {
            label: translate.instant("USER_SETTINGS.FORM.COMPANY_CARDS.NAME.LABEL"),
            placeholder: translate.instant("USER_SETTINGS.FORM.COMPANY_CARDS.NAME.PLACEHOLDER"),
            icon: "credit-card",
            maxLength: 50,
          },
          validation: {
            messages: {
              required: translate.instant("USER_SETTINGS.FORM.COMPANY_CARDS.NAME.VALIDATION_MESSAGE"),
            },
          },
          className: "col-6 m-b-16",
        },
        {
          key: "number",
          type: "input",
          templateOptions: {
            label: translate.instant("USER_SETTINGS.FORM.COMPANY_CARDS.NUMBER.LABEL"),
            placeholder: translate.instant("USER_SETTINGS.FORM.COMPANY_CARDS.NUMBER.PLACEHOLDER"),
            required: false,
            icon: "hash",
            maxLength: 50,
          },
          className: "col-6 m-b-16",
        },
      ],
    },
    className: "col-12",
  },
];
