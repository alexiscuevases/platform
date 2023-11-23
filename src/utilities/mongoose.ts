"use server";

import { connect, Connection, Schema } from "mongoose";
import { SchemaValidator } from "utilities";
import { MongoValidatorSchemaInterface } from "interfaces";
import { getEnvironmentVariable } from "helpers";

let dbConnection: any;
let dbOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const ConnectMongo = async (): Promise<Connection> => {
  if (dbConnection) return dbConnection;

  try {
    dbConnection = await connect(getEnvironmentVariable("MONGO_URI"), dbOptions);
  } catch (error: any) {
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export const SchemaMongo = <SchemaInterface>(validations: MongoValidatorSchemaInterface<SchemaInterface>) => {
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

  return new Schema<MongoValidatorSchemaInterface<SchemaInterface>>(validations, {
    versionKey: false,
    timestamps: {
      createdAt: "creation_date",
      updatedAt: "update_date"
    }
  });
};
