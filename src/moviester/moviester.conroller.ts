import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { MoviesterActorsService } from "./actors/actors.service";
import { MoviesterCountriesService } from "./countries/countries.service";
import { MoviesterDirectorsService } from "./directors/directors.service";
import { MoviesterCountryEntity } from "./entities/country.entity";
import { MoviesterGenreEntity } from "./entities/genre.entity";
import { MoviesterMovieTypeEntity } from "./entities/movie-type.entity";
import { CountryCreateExamples, CountryUpdateExamples } from "./examples/countries.examples";
import { GenreCreateExamples, GenreUpdateExamples } from "./examples/genres.examples";
import { MovieTypeCreateExamples, MovieTypeUpdateExamples } from "./examples/movie-types.examples";
import { MoviesterGenresService } from "./genres/genres.service";
import { MoviesterMovieTypesService } from "./movie-types/movie-types.service";
import { MoviesterMoviesService } from "./movies/movies.service";
import { CountriesQueryParams } from "./types/counties.types";
import { MoviesterEntityName } from "./types/general.types";
import { GenresQueryParams } from "./types/genres.types";
import { MovieTypesQueryParams } from "./types/movie-types.types";

@ApiTags("moviester")
@Controller("moviester")
@UseGuards(JwtAuthGuard)
export class MoviesterController {
  constructor(
    private moviesService: MoviesterMoviesService,
    private genresService: MoviesterGenresService,
    private movieTypesService: MoviesterMovieTypesService,
    private actorsService: MoviesterActorsService,
    private directorsService: MoviesterDirectorsService,
    private coutriesService: MoviesterCountriesService
  ) {}

  // ТИПЫ

  @Get("/movie-types")
  @ApiOperation({
    summary: "Получаем список типов",
  })
  getTypes(@Query() params: MovieTypesQueryParams) {
    return this.movieTypesService.getWithPagination(params);
  }

  @Post("/movie-types")
  @ApiOperation({
    summary: "Создаем новый тип",
  })
  @ApiBody({ type: MoviesterEntityName, examples: MovieTypeCreateExamples })
  createType(@Body() typeData: MoviesterEntityName) {
    return this.movieTypesService.create(typeData);
  }

  @Patch("/movie-types")
  @ApiOperation({
    summary: "Обновляем тип",
  })
  @ApiBody({ type: MoviesterMovieTypeEntity, examples: MovieTypeUpdateExamples })
  updateType(@Body() typeData: MoviesterMovieTypeEntity) {
    return this.movieTypesService.update(typeData);
  }

  @Delete("/movie-types/:id")
  @ApiOperation({
    summary: "Удаляем тип",
  })
  deleteType(@Param("id") typeId: string) {
    return this.movieTypesService.delete(+typeId);
  }

  // ЖАНРЫ

  @Get("/genres")
  @ApiOperation({
    summary: "Получаем список жанров",
  })
  getGenres(@Query() params: GenresQueryParams) {
    return this.genresService.getWithPagination(params);
  }

  @Post("/genres")
  @ApiOperation({
    summary: "Создаем новый жанр",
  })
  @ApiBody({ type: MoviesterEntityName, examples: GenreCreateExamples })
  createGenre(@Body() genreData: MoviesterEntityName) {
    return this.genresService.create(genreData);
  }

  @Patch("/genres")
  @ApiOperation({
    summary: "Обновляем жанр",
  })
  @ApiBody({ type: MoviesterGenreEntity, examples: GenreUpdateExamples })
  updateGenre(@Body() genreData: MoviesterGenreEntity) {
    return this.genresService.update(genreData);
  }

  @Delete("/genres/:id")
  @ApiOperation({
    summary: "Удаляем жанр",
  })
  deleteGenre(@Param("id") genreId: string) {
    return this.genresService.delete(+genreId);
  }

  // СТРАНЫ

  @Get("/countries")
  @ApiOperation({
    summary: "Получаем список стран",
  })
  getCountries(@Query() params: CountriesQueryParams) {
    return this.coutriesService.getWithPagination(params);
  }

  @Post("/countries")
  @ApiOperation({
    summary: "Создаем новую страну",
  })
  @ApiBody({ type: MoviesterEntityName, examples: CountryCreateExamples })
  createCountry(@Body() genreData: MoviesterEntityName) {
    return this.coutriesService.create(genreData);
  }

  @Patch("/countries")
  @ApiOperation({
    summary: "Обновляем страну",
  })
  @ApiBody({ type: MoviesterCountryEntity, examples: CountryUpdateExamples })
  updateCountry(@Body() countryData: MoviesterCountryEntity) {
    return this.coutriesService.update(countryData);
  }

  @Delete("/countries/:id")
  @ApiOperation({
    summary: "Удаляем страну",
  })
  deleteConytry(@Param("id") countryId: string) {
    return this.coutriesService.delete(+countryId);
  }
}
