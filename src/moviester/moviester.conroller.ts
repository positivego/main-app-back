import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MoviesterActorsService } from "./actors/actors.service";
import { MoviesterCountriesService } from "./countries/countries.service";
import { MoviesterDirectorsService } from "./directors/directors.service";
import { MoviesterGenresService } from "./genres/genres.service";
import { MoviesterMovieTypesService } from "./movie-types/movie-types.service";
import { MoviesterMoviesService } from "./movies/movies.service";

@ApiTags("moviester")
@Controller("moviester")
export class MoviesterController {
  constructor(
    private moviesService: MoviesterMoviesService,
    private genresService: MoviesterGenresService,
    private movieTypesService: MoviesterMovieTypesService,
    private actorsService: MoviesterActorsService,
    private directorsService: MoviesterDirectorsService,
    private coutriesService: MoviesterCountriesService
  ) {}

  @Get()
  get() {
    return 1;
  }
}
