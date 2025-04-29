import { MoviesterActorEntity } from "../entities/actor.entity";

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
