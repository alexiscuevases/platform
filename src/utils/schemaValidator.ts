import { GeneralErrors, GeneralResponse } from "@typescript/others";
import * as TS from "@typescript/utils/validator";
import { Validator } from "./validator";

export class SchemaValidator<Properties> {
  private schema: TS.SchemaValidator<Properties>;
  private customErrors: TS.ValidationErrorsSchema<Properties>;

  constructor(schema: TS.SchemaValidator<Properties>, customErrors?: TS.ValidationErrorsSchema<Properties>) {
    this.schema = schema;
    this.customErrors = customErrors;
  }

  validate(properties: Properties): GeneralResponse<void, Properties> {
    const errors: GeneralErrors<Properties> = {};
    const validator = new Validator();

    for (const key in this.schema) {
      if (this.schema.hasOwnProperty(key)) {
        const {
          minLength,
          maxLength,
          isObjectId,
          mapOf,
          notIsEnum,
          isEnum,
          isRequired,
          isEmail,
          isPassword,
          isRegex,
          valueType,
          isEqualTo
        } = this.schema[key];

        if (isRequired && validator.isEmpty(properties[key]))
          errors[key] = this.getCustomError(key, "isRequired") || "Field must be required";

        if (minLength && properties[key] !== undefined && validator.minLength(properties[key], minLength))
          errors[key] = this.getCustomError(key, "minLength") || `Field requires a minimum of ${minLength} characters`;

        if (isEqualTo && properties[key] !== undefined && !validator.isEqualTo(properties[key], properties[isEqualTo]))
          errors[key] = this.getCustomError(key, "isEqualTo") || `Field must equal ${isEqualTo}`;

        if (isRegex && properties[key] !== undefined && !validator.isRegex(properties[key], isRegex))
          errors[key] = this.getCustomError(key, "isRegex") || "Field contains illegal characters";

        if (maxLength && properties[key] !== undefined && validator.maxLength(properties[key], maxLength))
          errors[key] = this.getCustomError(key, "maxLength") || `Field requires a maximum of ${maxLength} characters`;

        if (isObjectId && properties[key] !== undefined && !validator.isObjectId(properties[key]))
          errors[key] = this.getCustomError(key, "isObjectId") || "Field is not a valid ObjectId";

        if (isEnum && properties[key] !== undefined && !validator.isEnum(properties[key], isEnum))
          errors[key] = this.getCustomError(key, "isEnum") || "Field has an invalid value";

        if (notIsEnum && properties[key] !== undefined && validator.isEnum(properties[key], notIsEnum))
          errors[key] = this.getCustomError(key, "notIsEnum") || "Field has an invalid value";

        if (isEmail && properties[key] !== undefined && !validator.isEmail(properties[key]))
          errors[key] = this.getCustomError(key, "isEmail") || "Invalid email address";

        if (isPassword && properties[key] !== undefined && !validator.isPassword(properties[key]))
          errors[key] = this.getCustomError(key, "isPassword") || "Weak password";

        if (typeof valueType === "object" && properties[key] !== undefined) {
          if (valueType instanceof SchemaValidator)
            errors[key] = valueType.validate(properties[key] ? properties[key] : {}).errors;
          else if (valueType[0] instanceof SchemaValidator) {
            for (const value in properties[key]) {
              const valueErrors = valueType[0].validate(properties[key][value]);
              if (!valueErrors.success) {
                errors[key] = errors[key] ? [...errors[key]] : [];
                errors[key][value] = valueErrors.errors;
              }
            }
          }
        }

        if (mapOf && properties[key] !== undefined) {
          Object.keys(properties[key]).map(value => {
            if (Array.isArray(properties[key][value])) {
              for (const valueInValue in properties[key][value]) {
                const valueErrors = mapOf[0].validate(properties[key][value][valueInValue]);
                if (!valueErrors.success) {
                  errors[key] = errors[key] ? errors[key] : [];
                  errors[key][value] = errors[key][value] ? errors[key][value] : [];
                  errors[key][value][valueInValue] = valueErrors.errors;
                }
              }
            } else {
              const valueErrors = mapOf.validate(properties[key][value]);
              if (!valueErrors.success) {
                errors[key] = errors[key] ? errors[key] : [];
                errors[key][value] = valueErrors.errors;
              }
            }
          });
        }
      }
    }

    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }

  private getCustomError(property: keyof Properties, validation: keyof TS.ValidationSchema) {
    if (this.customErrors && this.customErrors[property] && this.customErrors[property][validation])
      return this.customErrors[property][validation];
  }

  getSchemaErrorsValidations<Properties>(): TS.ValidationErrorsSchema<Properties> {
    const errorsValidations: any = {};
    for (const key in this.customErrors) errorsValidations[key] = this.getPropertyErrorsValidations(key);
    return errorsValidations;
  }

  getPropertyErrorsValidations(property: keyof Properties): TS.SchemaValidationErrors {
    const errorsValidations: TS.SchemaValidationErrors = {};
    if (this.customErrors.hasOwnProperty(property)) Object.assign(errorsValidations, this.customErrors[property]);
    return errorsValidations;
  }

  toMongoSchemaValidations(): TS.MongoValidatorSchema<Properties> {
    const validations: any = {};
    for (const key in this.schema) validations[key] = this.toMongoPropertyValidations(key);
    return validations;
  }

  toMongoPropertyValidations(property: keyof Properties): TS.MongoValidationSchema {
    let validations: TS.MongoValidationSchema = {};

    if (this.schema.hasOwnProperty(property)) {
      const { minLength, maxLength, isEnum, mapOf, isRequired, defaultValue, valueType, referenceModel, uniqueValue } =
        this.schema[property];

      if (valueType !== undefined) validations.type = valueType;
      if (minLength !== undefined) validations.minlength = minLength;
      if (maxLength !== undefined) validations.maxlength = maxLength;
      if (isEnum !== undefined) validations.enum = isEnum;
      if (mapOf !== undefined) validations.of = mapOf;
      if (isRequired !== undefined) validations.required = isRequired;
      if (defaultValue !== undefined) validations.default = defaultValue;
      if (referenceModel !== undefined) validations.ref = referenceModel;
      if (uniqueValue !== undefined) validations.unique = uniqueValue;
    }

    return validations;
  }

  getPropertyValidations(property: keyof Properties): TS.ValidationSchema {
    const validations: TS.ValidationSchema = {};
    if (this.schema.hasOwnProperty(property)) Object.assign(validations, this.schema[property]);
    return validations;
  }
}
