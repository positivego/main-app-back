import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesterActorsService } from "./actors/actors.service";
import { MoviesterCountriesService } from "./countries/countries.service";
import { MoviesterDirectorsService } from "./directors/directors.service";
import { MoviesterActorEntity } from "./entities/actor.entity";
import { MoviesterCountryEntity } from "./entities/country.entity";
import { MoviesterDirectorEntity } from "./entities/director.entity";
import { MoviesterGenreEntity } from "./entities/genre.entity";
import { MoviesterMovieTypeEntity } from "./entities/movie-type.entity";
import { MoviesterMovieEntity } from "./entities/movie.entity";
import { MoviesterGenresService } from "./genres/genres.service";
import { MoviesterMovieTypesService } from "./movie-types/movie-types.service";
import { MoviesterMoviesService } from "./movies/movies.service";
import { MoviesterController } from "./moviester.conroller";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        MoviesterGenreEntity,
        MoviesterMovieEntity,
        MoviesterMovieTypeEntity,
        MoviesterActorEntity,
        MoviesterDirectorEntity,
        MoviesterCountryEntity,
      ],
      "dbMoviester"
    ),
    JwtModule,
  ],
  providers: [
    MoviesterGenresService,
    MoviesterMoviesService,
    MoviesterMovieTypesService,
    MoviesterActorsService,
    MoviesterDirectorsService,
    MoviesterCountriesService,
  ],
  controllers: [MoviesterController],
  exports: [
    MoviesterGenresService,
    MoviesterMoviesService,
    MoviesterMovieTypesService,
    MoviesterActorsService,
    MoviesterDirectorsService,
    MoviesterCountriesService,
  ],
})
export class MoviesterModule {}
