import { MoviesterDirectorEntity } from "../entities/director.entity";
import { MoviesterEntityName } from "./general.types";

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
  name: MoviesterEntityName;
}

export class DirectorCreateDto {
  data: string;
}

export class DirectorUpdateDto {
  id: string;
  name: string;
  slug: string;
  images: string[];
}
