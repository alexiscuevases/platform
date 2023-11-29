export interface SchemaValidationErrors {
  minLength?: string;
  maxLength?: string;
  isDate?: string;
  isEnum?: string;
  notIsEnum?: string;
  isObjectId?: string;
  mapOf?: string;
  isRequired?: string;
  isEmail?: string;
  isPhone?: string;
  isRegex?: string;
  isEqualTo?: string;
  isPassword?: string;
  defaultValue?: string;
  uniqueValue?: string;
  valueType?: string;
  referenceModel?: string;
}

export type ValidationErrorsSchema<Property> = {
  [key in keyof Property]: SchemaValidationErrors;
};

export interface ValidationSchema {
  minLength?: number;
  maxLength?: number;
  isDate?: boolean;
  isEnum?: any[];
  notIsEnum?: any[];
  isObjectId?: boolean;
  mapOf?: any;
  isRequired?: boolean;
  isEmail?: boolean;
  isPhone?: boolean;
  isRegex?: any;
  isEqualTo?: string;
  isPassword?: boolean;
  defaultValue?: any;
  uniqueValue?: boolean;
  valueType?: any;
  referenceModel?: string;
}

export type SchemaValidator<Properties> = {
  [key in keyof Properties]: ValidationSchema;
};

export interface MongoValidationSchema {
  minlength?: number;
  maxlength?: number;
  of?: any;
  enum?: any[];
  required?: boolean;
  default?: any;
  unique?: boolean;
  type?: any;
  ref?: string;
}

export type MongoValidatorSchema<Properties> = {
  [key in keyof Properties]: MongoValidationSchema;
};
