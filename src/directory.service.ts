import { Injectable, OnModuleInit } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { directoriesNamesEnum } from "libs/constants/directories.constants";
import { join } from "path";

@Injectable()
export class DirectoryService implements OnModuleInit {
  onModuleInit() {
    this.createDirectories();
  }

  private createDirectories() {
    const mainFolder = join(process.cwd(), directoriesNamesEnum.main);
    const moviesFolder = join(mainFolder, directoriesNamesEnum.movies);
    const actorsFolder = join(mainFolder, directoriesNamesEnum.actors);
    const directorsFolder = join(mainFolder, directoriesNamesEnum.directors);

    if (!existsSync(mainFolder)) mkdirSync(mainFolder);
    if (!existsSync(moviesFolder)) mkdirSync(moviesFolder);
    if (!existsSync(actorsFolder)) mkdirSync(actorsFolder);
    if (!existsSync(directorsFolder)) mkdirSync(directorsFolder);
  }
}
