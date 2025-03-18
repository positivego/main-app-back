import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityName } from "../types/general.types";

@Entity("types")
export class MoviesterMovieTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: EntityName;
}
