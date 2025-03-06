import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const LoginExamples: ExamplesObject = {
  1: {
    summary: "Авторизация",
    description: "Пример авторизации",
    value: {
      email: "steradian.dev@gmail.com",
      password: "12345678",
    },
  },
};
