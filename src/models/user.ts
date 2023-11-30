import { UserSchema } from "@schemas/models/user";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const UserModel = models.User || model("User", SchemaMongo(UserSchema.toMongoSchemaValidations()));
