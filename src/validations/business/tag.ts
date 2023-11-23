import { CreateTagInterface, UpdateTagInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import { TagSchema } from "schemas";

export const CreateTagValidator = new SchemaValidator<CreateTagInterface>(
  {
    name: { ...TagSchema.getPropertyValidations("name") }
  },
  TagSchema.getSchemaErrorsValidations<CreateTagInterface>()
);

export const UpdateTagValidator = new SchemaValidator<UpdateTagInterface>(
  {
    name: { ...TagSchema.getPropertyValidations("name") }
  },
  TagSchema.getSchemaErrorsValidations<UpdateTagInterface>()
);
