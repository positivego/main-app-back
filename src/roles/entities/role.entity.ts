import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "../types/general.types";

@Entity("roles")
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  name: RoleName;
}
