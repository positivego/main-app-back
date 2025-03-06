import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const AccountsCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем пользователя",
    value: {
      email: "steradian.dev@gmail.com",
      username: "Steradian",
      password: "123456",
    },
  },
};
