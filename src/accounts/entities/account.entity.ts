import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class AccountPermissions {
  users: {
    edit: boolean;
    delete: boolean;
    banned: boolean;
    muted: boolean;
  };
  moviester: {
    movies: {
      apped: boolean;
      edit: boolean;
      delete: boolean;
    };
    comments: {
      edit: boolean;
      delete: boolean;
    };
  };
}

@Entity("accounts")
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "tinyint", default: 5 })
  roleId: number;

  @Column({ type: "tinyint", default: 0 })
  isBanned: boolean;

  @Column({ type: "json", nullable: true })
  permissions: AccountPermissions;

  @Column({ type: "text", nullable: true })
  refreshToken?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;
}
