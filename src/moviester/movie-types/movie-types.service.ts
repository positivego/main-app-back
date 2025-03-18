import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterMovieTypeEntity } from "../entities/movie-type.entity";

@Injectable()
export class MoviesterMovieTypesService {
  constructor(
    @InjectRepository(MoviesterMovieTypeEntity, "dbMoviester") private repo: Repository<MoviesterMovieTypeEntity>
  ) {}
}
