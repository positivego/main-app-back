import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterMovieEntity } from "../entities/movie.entity";

@Injectable()
export class MoviesterMoviesService {
  constructor(@InjectRepository(MoviesterMovieEntity, "dbMoviester") private repo: Repository<MoviesterMovieEntity>) {}
}
