import { NestFactory } from "@nestjs/core";
import * as basicAuth from "express-basic-auth";
import helmet from "helmet";
import { AccountsModule } from "./accounts/accounts.module";
import { AppModule } from "./app.module";
import { AuthModule } from "./auth/auth.module";
import { MoviesterModule } from "./moviester/moviester.module";
import { RolesModule } from "./roles/roles.module";
import menuSwagger from "./swagger/menu.swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: /https?:\//,
      methods: "GET,POST,PUT,PATCH,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
    bufferLogs: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  if (process.env.MODE != "dev") {
    app.use(
      ["/docs", "docs-json"],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER!]: process.env.SWAGGER_PASSWORD!,
        },
      })
    );
  }

  menuSwagger
    .setApp(app)
    .setMenu([
      {
        name: "Главная",
        path: "/docs",
        module: [AppModule, AuthModule, RolesModule, AccountsModule, MoviesterModule],
      },
      {
        name: "Основное",
        path: "/docs/main",
        module: [AppModule, AuthModule, RolesModule, AccountsModule],
      },
      {
        name: "Moviester",
        path: "/docs/moviester",
        module: [MoviesterModule],
      },
    ])
    .get("Main App", "Описание API");

  await app.listen(3000);
}
bootstrap();
