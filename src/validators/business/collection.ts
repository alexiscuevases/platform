import { CollectionSchema } from "@schemas/business/collection";
import { CreateCollection, UpdateCollection, UploadCollectionResources } from "@typescript/models/business/collection";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateCollection = new SchemaValidator<CreateCollection>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resources: { ...CollectionSchema.getPropertyValidations("resources") }
  },
  CollectionSchema.getSchemaErrorsValidations<CreateCollection>()
);

export const ValidatorToUpdateCollection = new SchemaValidator<UpdateCollection>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resources: { ...CollectionSchema.getPropertyValidations("resources") }
  },
  CollectionSchema.getSchemaErrorsValidations<UpdateCollection>()
);

export const ValidatorToUploadCollectionResources = new SchemaValidator<UploadCollectionResources>(
  {
    resources: { ...CollectionSchema.getPropertyValidations("resources"), isRequired: true }
  },
  CollectionSchema.getSchemaErrorsValidations<UploadCollectionResources>()
);
