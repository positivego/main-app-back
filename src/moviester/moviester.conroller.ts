import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { MoviesterActorsService } from "./actors/actors.service";
import { MoviesterCountriesService } from "./countries/countries.service";
import { MoviesterDirectorsService } from "./directors/directors.service";
import { MoviesterGenreEntity } from "./entities/genre.entity";
import { GenreCreateExamples, GenreUpdateExamples } from "./examples/genres.examples";
import { MoviesterGenresService } from "./genres/genres.service";
import { MoviesterMovieTypesService } from "./movie-types/movie-types.service";
import { MoviesterMoviesService } from "./movies/movies.service";
import { MoviesterEntityName } from "./types/general.types";
import { GenresQueryParams } from "./types/genres.types";

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
}
