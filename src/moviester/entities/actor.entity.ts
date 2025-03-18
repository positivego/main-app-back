import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityName } from "../types/general.types";

@Entity("actors")
export class MoviesterActorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: EntityName;

  @Column({ type: "text" })
  image: string;
}
