import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterGenreEntity } from "../entities/genre.entity";
import { MoviesterEntityName } from "../types/general.types";
import { GenresPaginationData, GenresQueryParams } from "../types/genres.types";

@Injectable()
export class MoviesterGenresService {
  constructor(@InjectRepository(MoviesterGenreEntity, "dbMoviester") private repo: Repository<MoviesterGenreEntity>) {}

  /**
   * Метод возвращает полный список жанров
   * @returns MoviesterGenreEntity[]
   */
  async getAll(): Promise<MoviesterGenreEntity[]> {
    return this.repo.find();
  }

  /**
   * Метод находит жанры по параметрам с пагинацией
   * @param {GenresQueryParams} params
   * @returns GenresPaginationData | null
   */
  async getWithPagination(params: GenresQueryParams): Promise<GenresPaginationData> {
    const query = this.repo.createQueryBuilder("genres");

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.skip(offset).take(limit);

    const [genres, total] = await query.getManyAndCount();
    const count = genres?.length;
    const pageCount = Math.ceil(total / limit);

    return { genres, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод создает новый жанр
   * @param {MoviesterEntityName} data
   * @returns MoviesterGenreEntity
   */
  async create(data: MoviesterEntityName): Promise<MoviesterGenreEntity> {
    const newGenre: MoviesterGenreEntity = {
      name: data,
    };

    const inserted = await this.repo.insert(newGenre);
    const genreId = inserted?.identifiers[0]?.id;
    newGenre.id = genreId;

    return newGenre;
  }

  /**
   * Метод обновляет жанр
   * @param {MoviesterGenreEntity} data
   * @returns MoviesterGenreEntity
   */
  async update(data: MoviesterGenreEntity): Promise<MoviesterGenreEntity> {
    const genre = await this.repo.findOne({ where: { id: data.id } });
    if (!genre) throw new HttpException("genre not found", HttpStatus.BAD_REQUEST);

    genre.name = data.name;
    await this.repo.update({ id: genre.id }, { name: genre.name });
    return genre;
  }

  /**
   * Метод удаляет жанр
   * @param {number} genreId
   * @returns number
   */
  async delete(genreId: number): Promise<number> {
    const genre = await this.repo.findOne({ where: { id: genreId } });
    if (!genre) throw new HttpException("genre not found", HttpStatus.BAD_REQUEST);

    await this.repo.delete({ id: genreId });
    return genreId;
  }
}
