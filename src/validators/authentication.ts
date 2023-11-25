import { AuthenticationSchema } from "@schemas/authentication";
import { UserSchema } from "@schemas/user";
import { CreateAuthentication, UpdateAuthentication } from "@typescript/models/authentication";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToUpdateAuthentication = new SchemaValidator<UpdateAuthentication>(
  {
    authenticated: { ...AuthenticationSchema.getPropertyValidations("authenticated") }
  },
  AuthenticationSchema.getSchemaErrorsValidations<UpdateAuthentication>()
);

export const ValidatorToCreateAuthentication = new SchemaValidator<CreateAuthentication>(
  {
    email: { ...UserSchema.getPropertyValidations("email") },
    password: { ...UserSchema.getPropertyValidations("password") }
  },
  AuthenticationSchema.getSchemaErrorsValidations<CreateAuthentication>()
);
