import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterDirectorEntity } from "../entities/director.entity";

@Injectable()
export class MoviesterDirectorsService {
  constructor(
    @InjectRepository(MoviesterDirectorEntity, "dbMoviester") private repo: Repository<MoviesterDirectorEntity>
  ) {}
}
