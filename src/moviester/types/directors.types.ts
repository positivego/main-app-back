import { MoviesterDirectorEntity } from "../entities/director.entity";

export class DirectorsQueryParams {
  page: number;
  limit: number;
}

export class DirectorsPaginationData {
  directors: MoviesterDirectorEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}

export class NewDirectorData {
  name: string;
}

export class DirectorCreateDto {
  data: NewDirectorData;
}

export class DirectorUpdateDto {
  id: string;
  name: string;
  slug: string;
  images: string[];
}
