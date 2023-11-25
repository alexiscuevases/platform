"use server";

import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import { SchemaValidator } from "@utils/schemaValidator";
import * as TS from "@typescript/utils/validator";
import { Schema, connect } from "mongoose";

let dbConnection: any;
let dbOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const ConnectMongo = async (): Promise<any> => {
  if (dbConnection) return dbConnection;

  try {
    dbConnection = await connect(getEnvironmentVariable("MONGO_URI"), dbOptions);
  } catch (error: any) {
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export const SchemaMongo = <ModelSchema>(validations: TS.MongoValidatorSchema<ModelSchema>) => {
  Object.keys(validations).map(validation => {
    if (validations[validation].ref) {
      if (!validations[validation].type[0]) validations[validation].type = Schema.Types.ObjectId;
      else validations[validation].type = [Schema.Types.ObjectId];
    }

    if (typeof validations[validation].type === "object") {
      if (validations[validation].type instanceof SchemaValidator)
        validations[validation].type = new Schema(validations[validation].type.toMongoSchemaValidations());
      else if (validations[validation].type[0] instanceof SchemaValidator)
        validations[validation].type = [new Schema(validations[validation].type[0].toMongoSchemaValidations())];
    }

    if (validations[validation].type === Map)
      validations[validation].of = new Schema(validations[validation].of.toMongoSchemaValidations());
  });

  return new Schema<TS.MongoValidatorSchema<ModelSchema>>(validations, {
    versionKey: false,
    timestamps: {
      createdAt: "creation_date",
      updatedAt: "update_date"
    }
  });
};
