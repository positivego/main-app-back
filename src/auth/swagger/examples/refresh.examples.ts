import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const RefreshExamples: ExamplesObject = {
  1: {
    summary: "Обновление",
    description: "Пример обновления",
    value: {
      refreshToken: "ТУТ ДОЛЖЕН БЫТЬ ТОКЕН",
    },
  },
};
