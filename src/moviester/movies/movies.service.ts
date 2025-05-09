import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterActorsService } from "../actors/actors.service";
import { MoviesterCountriesService } from "../countries/countries.service";
import { MoviesterDirectorsService } from "../directors/directors.service";
import { MoviesterMovieEntity } from "../entities/movie.entity";
import { MoviesterGenresService } from "../genres/genres.service";
import { MoviesterMovieTypesService } from "../movie-types/movie-types.service";
import { MoviesterMoviesData } from "../types/movies.types";

@Injectable()
export class MoviesterMoviesService {
  constructor(
    @InjectRepository(MoviesterMovieEntity, "dbMoviester")
    private repo: Repository<MoviesterMovieEntity>,
    private movieTypesService: MoviesterMovieTypesService,
    private genresService: MoviesterGenresService,
    private countriesService: MoviesterCountriesService,
    private actorsService: MoviesterActorsService,
    private directorsService: MoviesterDirectorsService
  ) {}

  /**
   * Получаем списки жанров, типов и всякого такого для фильма.
   */
  async getMoviesData(): Promise<MoviesterMoviesData> {
    const data: MoviesterMoviesData = {
      types: [],
      genres: [],
      countries: [],
      actors: [],
      directors: [],
    };

    const types = await this.movieTypesService.getAll();
    const genres = await this.genresService.getAll();
    const countries = await this.countriesService.getAll();
    const actors = await this.actorsService.getAll();
    const directors = await this.directorsService.getAll();

    data.types = types;
    data.genres = genres;
    data.countries = countries;
    data.actors = actors;
    data.directors = directors;
    return data;
  }
}
