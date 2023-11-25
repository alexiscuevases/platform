import { ProviderSchema } from "@schemas/business/provider";
import { CreateProvider, UpdateProvider } from "@typescript/models/business/provider";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateProvider = new SchemaValidator<CreateProvider>(
  {
    name: { ...ProviderSchema.getPropertyValidations("name") }
  },
  ProviderSchema.getSchemaErrorsValidations<CreateProvider>()
);

export const ValidatorToUpdateProvider = new SchemaValidator<UpdateProvider>(
  {
    name: { ...ProviderSchema.getPropertyValidations("name") }
  },
  ProviderSchema.getSchemaErrorsValidations<UpdateProvider>()
);
