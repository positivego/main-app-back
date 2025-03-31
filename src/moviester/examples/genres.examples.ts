import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const GenreCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем жанр",
    value: {
      ru: "Комедия",
      en: "Comedy",
    },
  },
};

export const GenreUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем жанр",
    value: {
      id: 1,
      name: {
        ru: "Комедия",
        en: "Comedy",
      },
    },
  },
};
