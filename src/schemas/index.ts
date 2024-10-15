import { emailRegex } from "../utils/regexValidations";

export const loginSchema = {
    email: {
      pattern: emailRegex,
      required: true,
    },
    password: {
      maxLength: 20,
      required: true,
    },
  };
