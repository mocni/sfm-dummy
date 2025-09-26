import { FormlyFieldConfig } from "@ngx-formly/core";

export function createFormlyFieldConfig(field: FormlyFieldConfig): FormlyFieldConfig {
  return {
    key: field.key,
    templateOptions: field.templateOptions,
    type: field.type,
    validation: field.validation,
    className: field.className,
    expressionProperties: field.expressionProperties,
  };
}
