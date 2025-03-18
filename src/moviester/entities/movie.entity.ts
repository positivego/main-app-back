import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityName } from "../types/general.types";

@Entity("movies")
export class MoviesterMovieEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "json" })
  name: EntityName;

  @Column({ type: "varchar", length: 255 })
  releseDate: string;

  @Column({ type: "int" })
  releseYaer: number;

  @Column({ type: "int" })
  countryId: number;

  @Column({ type: "int" })
  directorId: number;

  @Column({ type: "int" })
  time: number;

  @Column({ type: "int" })
  typeId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;
}
