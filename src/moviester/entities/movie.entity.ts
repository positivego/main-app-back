import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MoviesterEntityName } from "../types/general.types";

export class MoviesterMovieImages {
  poster: string[];
  images: string[];
}

@Entity("movies")
export class MoviesterMovieEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "json" })
  name: MoviesterEntityName;

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 255 })
  releseDate: string;

  @Column({ type: "int" })
  releseYaer: number;

  @Column({ type: "int" })
  countryId: number;

  @Column({ type: "int" })
  directorId: number;

  @Column({ type: "int" })
  timeCount: number;

  @Column({ type: "int" })
  typeId: number;

  @Column({ type: "json" })
  images: MoviesterMovieImages;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;
}
