import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { slugify } from "transliteration";
import { Repository } from "typeorm";
import { MoviesterActorEntity } from "../entities/actor.entity";
import { ActorsPaginationData, ActorsQueryParams, NewActorData } from "../types/actors.types";

@Injectable()
export class MoviesterActorsService {
  constructor(@InjectRepository(MoviesterActorEntity, "dbMoviester") private repo: Repository<MoviesterActorEntity>) {}

  /**
   * Метод возвращает актера по slug
   * @param {string} slug
   * @returns MoviesterActorEntity | null
   */
  async getBySlug(slug: string): Promise<MoviesterActorEntity | null> {
    return this.repo.findOne({ where: { slug } });
  }

  /**
   * Метод находит акторов по параметрам с пагинацией
   * @param {ActorsQueryParams} params
   * @returns ActorsPaginationData | null
   */
  async getWithPagination(params: ActorsQueryParams): Promise<ActorsPaginationData> {
    const query = this.repo.createQueryBuilder("actors");

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.skip(offset).take(limit);

    const [actors, total] = await query.getManyAndCount();
    const count = actors?.length;
    const pageCount = Math.ceil(total / limit);

    return { actors, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод создает нового актера, а так же все необходимые папки
   * @param {string} data
   * @param {Express.Multer.File[]} images
   * @returns MoviesterActorEntity
   */
  async create(data: string, images: Express.Multer.File[]): Promise<MoviesterActorEntity> {
    const newActorData = <NewActorData>JSON.parse(data);

    const slug = slugify(newActorData.name.ru);
    const existActor = await this.getBySlug(slug);
    if (existActor) throw new HttpException("Actor is exist", HttpStatus.BAD_REQUEST);

    const imagesPaths: string[] = [];

    if (images?.length) {
      const actorFolder = join(process.cwd(), "uploads", "actors", slug);
      if (!existsSync(actorFolder)) mkdirSync(actorFolder, { recursive: true });
      else throw new HttpException("Incorrect actor folder", HttpStatus.BAD_REQUEST);

      for (const image of images) {
        const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${image.originalname}`;
        const imagePath = join(actorFolder, imageName);

        writeFileSync(imagePath, image.buffer);
        imagesPaths.push(this.stabilizePath(imagePath));
      }
    }

    const newActor: MoviesterActorEntity = {
      name: newActorData.name,
      slug,
      images: imagesPaths,
    };

    const inserted = await this.repo.insert(newActor);
    const actorId = inserted?.identifiers[0]?.id;
    newActor.id = actorId;

    return newActor;
  }

  /**
   * Метод удаляет актера
   * @param {number} actorId
   * @returns number
   */
  async delete(actorId: number): Promise<number> {
    const actor = await this.repo.findOne({ where: { id: actorId } });
    if (!actor) throw new HttpException("actor not found", HttpStatus.BAD_REQUEST);

    const actorFolder = join(process.cwd(), "uploads", "actors", actor.slug);
    if (existsSync(actorFolder)) rmSync(actorFolder, { recursive: true, force: true });

    await this.repo.delete({ id: actorId });
    return actorId;
  }

  /**
   * Метод возвращает нормальную ссылку для файла
   * @param {string} currentPath
   * @returns string
   */
  private stabilizePath = (currentPath: string): string => {
    const path = currentPath.split("uploads").pop();
    const mainPath = process.env.MODE === "dev" ? "http://localhost:3000/" : "moviester.ru/";
    return `${mainPath}uploads${path}`;
  };
}
