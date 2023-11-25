import { Resource } from "@typescript/models/resource";
import { SchemaValidator } from "@utils/schemaValidator";

export const ResourceSchema = new SchemaValidator<Resource>({
  storage: { valueType: String, isRequired: false, isEnum: ["Cloudinary"], defaultValue: "Cloudinary" },
  path: { valueType: String, isRequired: true }
});
