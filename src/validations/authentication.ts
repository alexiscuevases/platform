import { CreateAuthenticationInterface, UpdateAuthenticationInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import { AuthenticationSchema, UserSchema } from "schemas";

export const CreateAuthenticationValidator = new SchemaValidator<CreateAuthenticationInterface>(
  {
    email: { ...UserSchema.getPropertyValidations("email") },
    password: { ...UserSchema.getPropertyValidations("password") }
  },
  AuthenticationSchema.getSchemaErrorsValidations<CreateAuthenticationInterface>()
);

export const UpdateAuthenticationValidator = new SchemaValidator<UpdateAuthenticationInterface>(
  {
    authenticated: { ...AuthenticationSchema.getPropertyValidations("authenticated") }
  },
  AuthenticationSchema.getSchemaErrorsValidations<UpdateAuthenticationInterface>()
);
