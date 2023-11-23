import { CreateProviderInterface, UpdateProviderInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import { ProviderSchema } from "schemas";

export const CreateProviderValidator = new SchemaValidator<CreateProviderInterface>(
  {
    name: { ...ProviderSchema.getPropertyValidations("name") }
  },
  ProviderSchema.getSchemaErrorsValidations<CreateProviderInterface>()
);

export const UpdateProviderValidator = new SchemaValidator<UpdateProviderInterface>(
  {
    name: { ...ProviderSchema.getPropertyValidations("name") }
  },
  ProviderSchema.getSchemaErrorsValidations<UpdateProviderInterface>()
);
