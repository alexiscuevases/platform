export interface SchemaValidationErrorsInterface {
  minLength?: string;
  maxLength?: string;
  isDate?: string;
  isEnum?: string;
  notIsEnum?: string;
  isObjectId?: string;
  mapOf?: string;
  isRequired?: string;
  isEmail?: string;
  isRegex?: string;
  isEqualTo?: string;
  isPassword?: string;
  defaultValue?: string;
  uniqueValue?: string;
  valueType?: string;
  referenceModel?: string;
}

export type ValidationErrorsSchemaInterface<Property> = {
  [key in keyof Property]: SchemaValidationErrorsInterface;
};

export interface ValidationSchemaInterface {
  minLength?: number;
  maxLength?: number;
  isDate?: boolean;
  isEnum?: any[];
  notIsEnum?: any[];
  isObjectId?: boolean;
  mapOf?: any;
  isRequired?: boolean;
  isEmail?: boolean;
  isRegex?: any;
  isEqualTo?: string;
  isPassword?: boolean;
  defaultValue?: any;
  uniqueValue?: boolean;
  valueType?: any;
  referenceModel?: string;
}

export type SchemaValidatorInterface<Properties> = {
  [key in keyof Properties]: ValidationSchemaInterface;
};

export interface MongoValidationSchemaInterface {
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

export type MongoValidatorSchemaInterface<Properties> = {
  [key in keyof Properties]: MongoValidationSchemaInterface;
};
