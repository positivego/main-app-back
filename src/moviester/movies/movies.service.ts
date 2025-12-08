import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { directoriesNamesEnum } from "libs/constants/directories.constants";
import { join } from "path";
import { slugify } from "transliteration";
import { Repository } from "typeorm";
import { stabilizePath, toNumberArray } from "utils/general.utils";
import { MoviesterActorsService } from "../actors/actors.service";
import { MoviesterCountriesService } from "../countries/countries.service";
import { MoviesterDirectorsService } from "../directors/directors.service";
import { MoviesterMovieEntity, MoviesterMovieImages } from "../entities/movie.entity";
import { MoviesterGenresService } from "../genres/genres.service";
import { MoviesterMovieTypesService } from "../movie-types/movie-types.service";
import { MoviesterEntityName } from "../types/general.types";
import { MoviesterMoviesData, NewMovieData, NewMovieFilesData } from "../types/movies.types";

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
   * @returns MoviesterMoviesData
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

  async getBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async create(data: NewMovieData, files: NewMovieFilesData) {
    console.log({ data });
    console.log("--------------");
    console.log({ files });
    console.log("--------------");

    const name: MoviesterEntityName = JSON.parse(data.name);

    const slug = slugify(name.ru);
    const existMovie = await this.getBySlug(slug);
    if (existMovie) throw new HttpException("Movie is exist", HttpStatus.BAD_REQUEST);

    const imagesPaths: MoviesterMovieImages = {
      images: [],
      poster: [],
    };

    if (files?.images?.length || files?.poster?.length) {
      const movieFolder = join(process.cwd(), directoriesNamesEnum.main, directoriesNamesEnum.movies, slug);
      if (!existsSync(movieFolder)) mkdirSync(movieFolder, { recursive: true });
      else throw new HttpException("Incorrect movie folder", HttpStatus.BAD_REQUEST);

      if (files?.images?.length) {
        for (const image of files.images) {
          const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${image.originalname}`;
          const imagePath = join(movieFolder, imageName);

          writeFileSync(imagePath, image.buffer);
          imagesPaths.images.push(stabilizePath(imagePath));
        }
      }

      if (files?.poster?.length) {
        for (const image of files.poster) {
          const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${image.originalname}`;
          const imagePath = join(movieFolder, imageName);

          writeFileSync(imagePath, image.buffer);
          imagesPaths.poster.push(stabilizePath(imagePath));
        }
      }
    }

    const genresIds = toNumberArray(data.genresIds);
    const actorsIds = toNumberArray(data.actorsIds);

    console.log({ name, slug, imagesPaths });
    console.log({ genresIds, actorsIds });
  }
}
