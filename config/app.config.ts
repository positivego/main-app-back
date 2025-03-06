import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const appConfig = () => ({
  dbMain: {
    type: "mysql",
    host: process.env[`DB_HOST_${process.env.MODE!.toUpperCase()}`],
    port: parseInt(process.env[`DB_PORT_MAIN_${process.env.MODE!.toUpperCase()}`]!),
    username: process.env[`DB_USERNAME_MAIN_${process.env.MODE!.toUpperCase()}`],
    password: process.env[`DB_PASSWORD_MAIN_${process.env.MODE!.toUpperCase()}`],
    database: process.env[`DB_DATABASE_MAIN_${process.env.MODE!.toUpperCase()}`],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    logging: +process.env.DB_LOG_QUERY! == 1,
  },
  dbMoviester: {
    type: "mysql",
    host: process.env[`DB_HOST_MOVIESTER_${process.env.MODE!.toUpperCase()}`],
    port: parseInt(process.env[`DB_PORT_MOVIESTER_${process.env.MODE!.toUpperCase()}`]!),
    username: process.env[`DB_USERNAME_MOVIESTER_${process.env.MODE!.toUpperCase()}`],
    password: process.env[`DB_PASSWORD_MOVIESTER_${process.env.MODE!.toUpperCase()}`],
    database: process.env[`DB_DATABASE_MOVIESTER_${process.env.MODE!.toUpperCase()}`],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    logging: +process.env.DB_LOG_QUERY! == 1,
  },
});
