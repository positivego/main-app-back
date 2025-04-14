import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const MovieTypeCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем тип",
    value: {
      ru: "Фильм",
      en: "Film",
    },
  },
};

export const MovieTypeUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем тип",
    value: {
      id: 1,
      name: {
        ru: "Фильм",
        en: "Film",
      },
    },
  },
};
