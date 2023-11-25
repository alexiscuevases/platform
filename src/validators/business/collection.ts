import { CollectionSchema } from "@schemas/business/collection";
import { CreateCollection, UpdateCollection } from "@typescript/models/business/collection";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateCollection = new SchemaValidator<CreateCollection>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resource: { ...CollectionSchema.getPropertyValidations("resource") }
  },
  CollectionSchema.getSchemaErrorsValidations<CreateCollection>()
);

export const ValidatorToUpdateCollection = new SchemaValidator<UpdateCollection>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resource: { ...CollectionSchema.getPropertyValidations("resource") }
  },
  CollectionSchema.getSchemaErrorsValidations<UpdateCollection>()
);
