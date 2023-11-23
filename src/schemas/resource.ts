import { ResourceInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const ResourceSchema = new SchemaValidator<ResourceInterface>({
  storage: { valueType: String, isRequired: false, isEnum: ["Cloudinary"], defaultValue: "Cloudinary" },
  path: { valueType: String, isRequired: true }
});
