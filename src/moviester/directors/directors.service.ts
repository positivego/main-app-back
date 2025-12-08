import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from "fs";
import { directoriesNamesEnum } from "libs/constants/directories.constants";
import { join } from "path";
import { slugify } from "transliteration";
import { Repository } from "typeorm";
import { extractFilenames, stabilizePath } from "utils/general.utils";
import { MoviesterDirectorEntity } from "../entities/director.entity";
import {
  DirectorsPaginationData,
  DirectorsQueryParams,
  DirectorUpdateDto,
  NewDirectorData,
} from "../types/directors.types";
import { MoviesterEntityName } from "../types/general.types";

@Injectable()
export class MoviesterDirectorsService {
  constructor(
    @InjectRepository(MoviesterDirectorEntity, "dbMoviester") private repo: Repository<MoviesterDirectorEntity>
  ) {}

  /**
   * Метод возвращает полный список режиссеров
   * @returns MoviesterDirectorEntity[]
   */
  async getAll(): Promise<MoviesterDirectorEntity[]> {
    return this.repo.find();
  }

  /**
   * Метод возвращает режиссера по slug
   * @param {string} slug
   * @returns MoviesterDirectorEntity | null
   */
  async getBySlug(slug: string): Promise<MoviesterDirectorEntity | null> {
    return this.repo.findOne({ where: { slug } });
  }

  /**
   * Метод находит режиссера по параметрам с пагинацией
   * @param {DirectorsQueryParams} params
   * @returns DirectorsPaginationData | null
   */
  async getWithPagination(params: DirectorsQueryParams): Promise<DirectorsPaginationData> {
    const query = this.repo.createQueryBuilder("directors");

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.orderBy("directors.id", "DESC").skip(offset).take(limit);

    const [directors, total] = await query.getManyAndCount();
    const count = directors?.length;
    const pageCount = Math.ceil(total / limit);

    return { directors, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод создает нового режиссера, а так же все необходимые папки
   * @param {NewDirectorData} data
   * @param {Express.Multer.File[]} images
   * @returns MoviesterDirectorEntity
   */
  async create(data: NewDirectorData, images: Express.Multer.File[]): Promise<MoviesterDirectorEntity> {
    const name: MoviesterEntityName = JSON.parse(data.name);

    const slug = slugify(name.ru);
    const existActor = await this.getBySlug(slug);
    if (existActor) throw new HttpException("Director is exist", HttpStatus.BAD_REQUEST);

    const imagesPaths: string[] = [];

    if (images?.length) {
      const actorFolder = join(process.cwd(), directoriesNamesEnum.main, directoriesNamesEnum.directors, slug);
      if (!existsSync(actorFolder)) mkdirSync(actorFolder, { recursive: true });
      else throw new HttpException("Incorrect director folder", HttpStatus.BAD_REQUEST);

      for (const image of images) {
        const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${image.originalname}`;
        const imagePath = join(actorFolder, imageName);

        writeFileSync(imagePath, image.buffer);
        imagesPaths.push(stabilizePath(imagePath));
      }
    }

    const newDirector: MoviesterDirectorEntity = {
      name,
      slug,
      images: imagesPaths,
    };

    const inserted = await this.repo.insert(newDirector);
    const directorId = inserted?.identifiers[0]?.id;
    newDirector.id = directorId;

    return newDirector;
  }

  /**
   * Метод обновляет режиссера, а так же все необходимые папки
   * @param {DirectorUpdateDto} data
   * @param {Express.Multer.File[]} images
   * @returns MoviesterDirectorEntity
   */
  async update(data: DirectorUpdateDto, images: Express.Multer.File[]): Promise<MoviesterDirectorEntity> {
    const name = <MoviesterEntityName>JSON.parse(data.name);

    const director = await this.getBySlug(data.slug);
    if (!director) throw new HttpException("Director is not exist", HttpStatus.BAD_REQUEST);
    if (director.id !== +data.id) throw new HttpException("Director is not correct", HttpStatus.BAD_REQUEST);

    const currentImages: string[] = [];
    const dataImages = extractFilenames(data.images);
    for (const image of director.images) {
      const fileName = extractFilenames(image)[0];
      if (dataImages?.includes(fileName)) currentImages.push(image);
      else {
        const filePath = join(
          process.cwd(),
          directoriesNamesEnum.main,
          directoriesNamesEnum.directors,
          director.slug,
          fileName
        );
        if (existsSync(filePath)) unlinkSync(filePath);
      }
    }

    if (images?.length) {
      const directorFolder = join(
        process.cwd(),
        directoriesNamesEnum.main,
        directoriesNamesEnum.directors,
        director.slug
      );
      if (!existsSync(directorFolder)) mkdirSync(directorFolder, { recursive: true });

      for (const image of images) {
        const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${image.originalname}`;
        const imagePath = join(directorFolder, imageName);

        writeFileSync(imagePath, image.buffer);
        currentImages.push(stabilizePath(imagePath));
      }
    }

    director.name = name;
    director.images = currentImages;
    await this.repo.update({ id: +data.id }, { name, images: currentImages });

    return director;
  }

  /**
   * Метод удаляет режиссера
   * @param {number} directorId
   * @returns number
   */
  async delete(directorId: number): Promise<number> {
    const actor = await this.repo.findOne({ where: { id: directorId } });
    if (!actor) throw new HttpException("director not found", HttpStatus.BAD_REQUEST);

    const actorFolder = join(process.cwd(), directoriesNamesEnum.main, directoriesNamesEnum.directors, actor.slug);
    if (existsSync(actorFolder)) rmSync(actorFolder, { recursive: true, force: true });

    await this.repo.delete({ id: directorId });
    return directorId;
  }
}
