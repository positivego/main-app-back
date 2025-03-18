import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityName } from "../types/general.types";

@Entity("countries")
export class MoviesterCountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: EntityName;
}
