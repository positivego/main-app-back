import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityName } from "../types/general.types";

@Entity("directors")
export class MoviesterDirectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: EntityName;

  @Column({ type: "text" })
  image: string;
}
