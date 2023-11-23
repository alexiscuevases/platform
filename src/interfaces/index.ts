export * from "./user";
export * from "./validator";
export * from "./authentication";
export * from "./nodemailer";
export * from "./business";
export * from "./business/product";
export * from "./business/collection";
export * from "./business/tag";
export * from "./business/category";
export * from "./business/provider";
export * from "./payment";
export * from "./verification";
export * from "./resource";

export interface TaxInterface {
  tax_name: string;
  tax_percentage: number;
  tax_included?: boolean;
}

export interface TaxesInterface {
  [key: string]: TaxInterface[];
}

export interface TranslationsInterface {
  [key: string]: string;
}

export interface MongoSchemaDefaultProperties {
  _id?: string;
  creation_date?: Date;
  update_date?: Date;
}

export type ErrorsInterface<Errors> = {
  [key in keyof Errors | "GENERAL_ERROR"]?: any;
};

export interface ResponseInterface<Result, Errors> {
  success: boolean;
  errors?: ErrorsInterface<Errors>;
  result?: Result;
}
