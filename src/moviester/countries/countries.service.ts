import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterCountryEntity } from "../entities/country.entity";
import { CointriesPaginationData, CountriesQueryParams } from "../types/counties.types";
import { MoviesterEntityName } from "../types/general.types";

@Injectable()
export class MoviesterCountriesService {
  constructor(
    @InjectRepository(MoviesterCountryEntity, "dbMoviester") private repo: Repository<MoviesterCountryEntity>
  ) {}

  /**
   * Метод возвращает полный список стран
   * @returns MoviesterCountryEntity[]
   */
  async getAll(): Promise<MoviesterCountryEntity[]> {
    return this.repo.find();
  }

  /**
   * Метод находит страны по параметрам с пагинацией
   * @param {CountriesQueryParams} params
   * @returns CointriesPaginationData | null
   */
  async getWithPagination(params: CountriesQueryParams): Promise<CointriesPaginationData> {
    const query = this.repo.createQueryBuilder("countries");

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.skip(offset).take(limit);

    const [countries, total] = await query.getManyAndCount();
    const count = countries?.length;
    const pageCount = Math.ceil(total / limit);

    return { countries, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод создает новую страну
   * @param {MoviesterEntityName} data
   * @returns MoviesterCountryEntity
   */
  async create(data: MoviesterEntityName): Promise<MoviesterCountryEntity> {
    const newCountry: MoviesterCountryEntity = {
      name: data,
    };

    const inserted = await this.repo.insert(newCountry);
    const countryId = inserted?.identifiers[0]?.id;
    newCountry.id = countryId;

    return newCountry;
  }

  /**
   * Метод обновляет страну
   * @param {MoviesterCountryEntity} data
   * @returns MoviesterCountryEntity
   */
  async update(data: MoviesterCountryEntity): Promise<MoviesterCountryEntity> {
    const country = await this.repo.findOne({ where: { id: data.id } });
    if (!country) throw new HttpException("country not found", HttpStatus.BAD_REQUEST);

    country.name = data.name;
    await this.repo.update({ id: country.id }, { name: country.name });
    return country;
  }

  /**
   * Метод удаляет страну
   * @param {number} countryId
   * @returns number
   */
  async delete(countryId: number): Promise<number> {
    const country = await this.repo.findOne({ where: { id: countryId } });
    if (!country) throw new HttpException("country not found", HttpStatus.BAD_REQUEST);

    await this.repo.delete({ id: countryId });
    return countryId;
  }
}
