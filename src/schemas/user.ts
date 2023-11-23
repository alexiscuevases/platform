import { UserInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const UserSchema = new SchemaValidator<UserInterface>(
  {
    types: {
      valueType: [String],
      isRequired: false,
      isEnum: ["Employee", "Investor", "User", "Partner"],
      defaultValue: ["User"]
    },
    employee_positions: {
      valueType: [String],
      isRequired: false,
      isEnum: ["CEO", "CFO", "CMO", "COO", "CIO", "CTO", "CCO", "No employee"],
      defaultValue: ["No employee"]
    },
    status: {
      valueType: String,
      isRequired: false,
      isEnum: ["Normal", "Restricted", "With restrictions"],
      defaultValue: "Normal"
    },
    restrictions: { valueType: Object, isRequired: false, defaultValue: {} },
    names: { valueType: String, isRequired: true, maxLength: 32 },
    surnames: { valueType: String, isRequired: true, maxLength: 32 },
    email: { valueType: String, isRequired: true, isEmail: true },
    password: { valueType: String, isRequired: true, isPassword: true },
    failed_attempts: { valueType: Number, isRequired: false, defaultValue: 0 },
    two_factor_authentication: { valueType: Boolean, isRequired: false, defaultValue: false },
    last_authentication_id: {
      valueType: String,
      isRequired: false,
      defaultValue: null,
      referenceModel: "Authentication",
      isObjectId: true
    }
  },
  {
    password: { isPassword: "Contraseña insegura" }
  }
);
