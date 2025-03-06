import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const RegisterExamples: ExamplesObject = {
  1: {
    summary: "Регистрация",
    description: "Пример регистрации",
    value: {
      username: "Steradian",
      email: "steradian.dev@gmail.com",
      password: "12345678",
    },
  },
};
