import { MoviesterActorEntity } from "../entities/actor.entity";
import { MoviesterEntityName } from "./general.types";

export class ActorsQueryParams {
  page: number;
  limit: number;
}

export class ActorsPaginationData {
  actors: MoviesterActorEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}

export class NewActorData {
  name: MoviesterEntityName;
}

export class ActorCreateDto {
  data: string;
}
