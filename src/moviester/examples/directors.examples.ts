import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const DirectorCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем режиссера",
    value: {
      data: '{"name":{"ru":"Юрка","en":"Yurka"}}',
    },
  },
};

export const DirectorUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем режиссера",
    value: {
      id: "1",
      name: '{"name":{"ru":"Юрка","en":"Yurka"}}',
      slug: "test",
      images: [],
    },
  },
};
