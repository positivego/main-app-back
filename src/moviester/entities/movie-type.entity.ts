import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MoviesterEntityName } from "../types/general.types";

@Entity("types")
export class MoviesterMovieTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: MoviesterEntityName;
}
