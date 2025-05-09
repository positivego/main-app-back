import { MoviesterActorEntity } from "../entities/actor.entity";
import { MoviesterCountryEntity } from "../entities/country.entity";
import { MoviesterDirectorEntity } from "../entities/director.entity";
import { MoviesterGenreEntity } from "../entities/genre.entity";
import { MoviesterMovieTypeEntity } from "../entities/movie-type.entity";

export class MoviesterMoviesData {
  genres: MoviesterGenreEntity[];
  types: MoviesterMovieTypeEntity[];
  countries: MoviesterCountryEntity[];
  actors: MoviesterActorEntity[];
  directors: MoviesterDirectorEntity[];
}
