import { MoviesterMovieTypeEntity } from "../entities/movie-type.entity";

export class MovieTypesQueryParams {
  page: number;
  limit: number;
}

export class MovieTypesPaginationData {
  types: MoviesterMovieTypeEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
