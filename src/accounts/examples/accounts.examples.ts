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

export const AccountsUpdateExamples: ExamplesObject = {
  1: {
    summary: "Пример",
    description: "Обновляем аккаунт",
    value: {
      id: 5,
      email: "steradian.dev@gmail.com",
      username: "Steradian",
      password: "$2b$10$WkUDM7jL08/6EpiubyGW8eAEXBRfxtPpBNwNe7TAXIt65LSNv1uB6",
      roleId: 1,
      isBanned: 0,
      permissions: {
        users: {
          edit: false,
          muted: false,
          banned: false,
          delete: false,
        },
        moviester: {
          movies: {
            edit: false,
            apped: false,
            delete: false,
          },
          comments: {
            edit: false,
            delete: false,
          },
        },
      },
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJTdGVyYWRpYW4iLCJlbWFpbCI6InN0ZXJhZGlhbi5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzQyMjYzNjMyLCJleHAiOjE3NDI4Njg0MzJ9.eui5Wh6ztAPWOO5fFdiCPRSXBDIpvLZA2TIsiJR5sT0",
      createdAt: "2025-03-04T11:11:31.000Z",
      updatedAt: "2025-03-18T02:07:16.000Z",
    },
  },
};
