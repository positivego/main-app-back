import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const RolesExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем роль",
    value: {
      ru: "Супер-админ",
      en: "Super-admin",
    },
  },
};
