import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const ActorCreateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Создаем актера",
    value: {
      data: '{"name":{"ru":"Юрка","en":"Yurka"}}',
    },
  },
};

export const ActorUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем актера",
    value: {
      id: 1,
      name: {
        ru: "Юрка1",
        en: "Yurka2",
      },
      slug: "",
      images: [],
    },
  },
};
