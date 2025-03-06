import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "./entities/role.entity";
import { RoleName } from "./types/general.types";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RoleEntity, "dbMain") private repo: Repository<RoleEntity>) {}

  /**
   * Получаем список ролей
   * @returns RoleEntity[]
   */
  async get(): Promise<RoleEntity[]> {
    return this.repo.find();
  }

  /**
   * Создаем новую роль
   * @param {RoleName} name
   * @returns RoleEntity
   */
  async create(name: RoleName): Promise<RoleEntity> {
    return this.repo.save({ name });
  }
}
