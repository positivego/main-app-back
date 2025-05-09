import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MoviesterEntityName } from "../types/general.types";

@Entity("directors")
export class MoviesterDirectorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "json" })
  name: MoviesterEntityName;

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "json" })
  images: string[];
}
