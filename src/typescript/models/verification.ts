import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

type VerificationTypes = "Two factor authentication" | "Access recovery";

export interface Verification extends MongooseSchemaDefaultProperties {
  user_id?: string;
  type?: VerificationTypes;
  code?: string;
  failed_attemps?: number;
  expiration_date?: Date;
}

export interface CreateVerification {
  user_id: string;
  type: VerificationTypes;
}
