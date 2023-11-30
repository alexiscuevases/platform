import { TagSchema } from "@schemas/models/business/tag";
import { CreateTag, UpdateTag } from "@typescript/models/business/tag";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateTag = new SchemaValidator<CreateTag>(
  {
    name: { ...TagSchema.getPropertyValidations("name") }
  },
  TagSchema.getSchemaErrorsValidations<CreateTag>()
);

export const ValidatorToUpdateTag = new SchemaValidator<UpdateTag>(
  {
    name: { ...TagSchema.getPropertyValidations("name") }
  },
  TagSchema.getSchemaErrorsValidations<UpdateTag>()
);
