import { CreateCollectionInterface, UpdateCollectionInterface } from "interfaces";
import { CollectionSchema } from "schemas";
import { SchemaValidator } from "utilities";

export const CreateCollectionValidator = new SchemaValidator<CreateCollectionInterface>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resource: { ...CollectionSchema.getPropertyValidations("resource") }
  },
  CollectionSchema.getSchemaErrorsValidations<CreateCollectionInterface>()
);

export const UpdateCollectionValidator = new SchemaValidator<UpdateCollectionInterface>(
  {
    path: { ...CollectionSchema.getPropertyValidations("path") },
    status: { ...CollectionSchema.getPropertyValidations("status") },
    names: { ...CollectionSchema.getPropertyValidations("names") },
    descriptions: { ...CollectionSchema.getPropertyValidations("descriptions") },
    resource: { ...CollectionSchema.getPropertyValidations("resource") }
  },
  CollectionSchema.getSchemaErrorsValidations<UpdateCollectionInterface>()
);
