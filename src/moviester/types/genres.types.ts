import { MoviesterGenreEntity } from "../entities/genre.entity";

export class GenresQueryParams {
  page: number;
  limit: number;
}

export class GenresPaginationData {
  genres: MoviesterGenreEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
