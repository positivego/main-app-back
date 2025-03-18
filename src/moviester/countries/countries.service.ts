import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesterCountryEntity } from "../entities/country.entity";

@Injectable()
export class MoviesterCountriesService {
  constructor(
    @InjectRepository(MoviesterCountryEntity, "dbMoviester") private repo: Repository<MoviesterCountryEntity>
  ) {}
}
