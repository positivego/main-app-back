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

export class NewMovieData {
  name: string;
  description: string;
  genresIds: string;
  actorsIds: string[];
  releseDate: string;
  releseYaer: string;
  countryId: string;
  directorId: string;
  timeCount: string;
  typeId: string;
}

export class NewMovieFilesData {
  images?: Express.Multer.File[];
  poster?: Express.Multer.File[];
}
