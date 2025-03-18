import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterGenreEntity } from "../entities/genre.entity";

@Injectable()
export class MoviesterGenresService {
  constructor(@InjectRepository(MoviesterGenreEntity, "dbMoviester") private repo: Repository<MoviesterGenreEntity>) {}
}
