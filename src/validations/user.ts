import { ChangeUserPasswordInterface, CreateUserInterface } from "interfaces";
import { UserSchema } from "schemas";
import { SchemaValidator } from "utilities";

export const CreateUserValidator = new SchemaValidator<CreateUserInterface>(
  {
    names: { ...UserSchema.getPropertyValidations("names") },
    surnames: { ...UserSchema.getPropertyValidations("surnames") },
    email: { ...UserSchema.getPropertyValidations("email") },
    password: { ...UserSchema.getPropertyValidations("password") },
    password_confirmation: { isRequired: true, isEqualTo: "password" }
  },
  {
    ...UserSchema.getSchemaErrorsValidations<CreateUserInterface>(),
    password_confirmation: { isEqualTo: "Las contraseñas deben ser idénticas." }
  }
);

export const ChangeUserPasswordValidator = new SchemaValidator<ChangeUserPasswordInterface>(
  {
    password: { ...UserSchema.getPropertyValidations("password") },
    password_confirmation: { isRequired: true, isEqualTo: "password" }
  },
  {
    ...UserSchema.getSchemaErrorsValidations<ChangeUserPasswordInterface>(),
    password_confirmation: { isEqualTo: "Las contraseñas deben ser idénticas." }
  }
);
