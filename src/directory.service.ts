import { Injectable, OnModuleInit } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

@Injectable()
export class DirectoryService implements OnModuleInit {
  onModuleInit() {
    this.createDirectories();
  }

  private createDirectories() {
    const mainFolder = join(process.cwd(), "uploads");
    const filmsFolder = join(mainFolder, "films");
    const actorsFolder = join(mainFolder, "actors");
    const directorsFolder = join(mainFolder, "directors");

    if (!existsSync(mainFolder)) mkdirSync(mainFolder);
    if (!existsSync(filmsFolder)) mkdirSync(filmsFolder);
    if (!existsSync(actorsFolder)) mkdirSync(actorsFolder);
    if (!existsSync(directorsFolder)) mkdirSync(directorsFolder);
  }
}
