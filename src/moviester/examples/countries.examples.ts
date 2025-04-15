import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const CountryCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем страну",
    value: {
      ru: "Россия",
      en: "Russia",
    },
  },
};

export const CountryUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем страну",
    value: {
      id: 1,
      name: {
        ru: "Россия",
        en: "Russia",
      },
    },
  },
};
