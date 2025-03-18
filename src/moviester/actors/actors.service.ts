import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterActorEntity } from "../entities/actor.entity";

@Injectable()
export class MoviesterActorsService {
  constructor(@InjectRepository(MoviesterActorEntity, "dbMoviester") private repo: Repository<MoviesterActorEntity>) {}
}
