import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterMovieTypeEntity } from "../entities/movie-type.entity";
import { MoviesterEntityName } from "../types/general.types";
import { MovieTypesPaginationData, MovieTypesQueryParams } from "../types/movie-types.types";

@Injectable()
export class MoviesterMovieTypesService {
  constructor(
    @InjectRepository(MoviesterMovieTypeEntity, "dbMoviester") private repo: Repository<MoviesterMovieTypeEntity>
  ) {}

  /**
   * Метод возвращает полный список типов
   * @returns MoviesterMovieTypeEntity[]
   */
  async getAll(): Promise<MoviesterMovieTypeEntity[]> {
    return this.repo.find();
  }

  /**
   * Метод находит типы по параметрам с пагинацией
   * @param {MovieTypesQueryParams} params
   * @returns MovieTypesPaginationData | null
   */
  async getWithPagination(params: MovieTypesQueryParams): Promise<MovieTypesPaginationData> {
    const query = this.repo.createQueryBuilder("types");

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.skip(offset).take(limit);

    const [types, total] = await query.getManyAndCount();
    const count = types?.length;
    const pageCount = Math.ceil(total / limit);

    return { types, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод создает новый тип
   * @param {MoviesterEntityName} data
   * @returns MoviesterMovieTypeEntity
   */
  async create(data: MoviesterEntityName): Promise<MoviesterMovieTypeEntity> {
    const newType: MoviesterMovieTypeEntity = {
      name: data,
    };

    const inserted = await this.repo.insert(newType);
    const typeId = inserted?.identifiers[0]?.id;
    newType.id = typeId;

    return newType;
  }

  /**
   * Метод обновляет тип
   * @param {MoviesterMovieTypeEntity} data
   * @returns MoviesterMovieTypeEntity
   */
  async update(data: MoviesterMovieTypeEntity): Promise<MoviesterMovieTypeEntity> {
    const movieType = await this.repo.findOne({ where: { id: data.id } });
    if (!movieType) throw new HttpException("movie type not found", HttpStatus.BAD_REQUEST);

    movieType.name = data.name;
    await this.repo.update({ id: movieType.id }, { name: movieType.name });
    return movieType;
  }

  /**
   * Метод удаляет тип
   * @param {number} movieTypeId
   * @returns number
   */
  async delete(movieTypeId: number): Promise<number> {
    const movieType = await this.repo.findOne({ where: { id: movieTypeId } });
    if (!movieType) throw new HttpException("movie type not found", HttpStatus.BAD_REQUEST);

    await this.repo.delete({ id: movieTypeId });
    return movieTypeId;
  }
}
