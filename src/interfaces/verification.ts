import { MongoSchemaDefaultProperties } from "interfaces";

type VerificationTypes = "Two factor authentication" | "Access recovery";

export interface CreateVerificationInterface {
  user_id: string;
  type: VerificationTypes;
}

export interface VerificationInterface extends MongoSchemaDefaultProperties {
  user_id?: string;
  type?: VerificationTypes;
  code?: string;
  failed_attemps?: number;
  expiration_date?: Date;
}

export interface VerificationApiResponseInterface {
  _id?: string;
}
