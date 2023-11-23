import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { UserSchema } from "schemas";

export const UserModel = models.User || model("User", SchemaMongo(UserSchema.toMongoSchemaValidations()));
