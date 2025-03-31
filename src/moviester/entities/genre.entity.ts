import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MoviesterEntityName } from "../types/general.types";

@Entity("genres")
export class MoviesterGenreEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "json" })
  name: MoviesterEntityName;
}
