import { UserSchema } from "@schemas/user";
import { ChangeUserPassword, CreateUser } from "@typescript/models/user";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateUser = new SchemaValidator<CreateUser>(
  {
    names: { ...UserSchema.getPropertyValidations("names") },
    surnames: { ...UserSchema.getPropertyValidations("surnames") },
    email: { ...UserSchema.getPropertyValidations("email") },
    password: { ...UserSchema.getPropertyValidations("password") },
    password_confirmation: { isRequired: true, isEqualTo: "password" }
  },
  {
    ...UserSchema.getSchemaErrorsValidations<CreateUser>(),
    password_confirmation: { isEqualTo: "Las contraseñas deben ser idénticas." }
  }
);

export const ValidatorToChangeUserPassword = new SchemaValidator<ChangeUserPassword>(
  {
    password: { ...UserSchema.getPropertyValidations("password") },
    password_confirmation: { isRequired: true, isEqualTo: "password" }
  },
  {
    ...UserSchema.getSchemaErrorsValidations<ChangeUserPassword>(),
    password_confirmation: { isEqualTo: "Las contraseñas deben ser idénticas." }
  }
);
