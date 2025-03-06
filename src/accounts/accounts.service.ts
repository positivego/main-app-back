import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { AccountRoleEnum } from "libs/constants/accounts.constants";
import { AuthRegCredential } from "src/auth/types/register.types";
import { Repository } from "typeorm";
import { AccountEntity, AccountPermissions } from "./entities/account.entity";
import { AccountFindQueryParams, AccountsPaginationData, AccountsQueryParams } from "./types/general.types";

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(AccountEntity, "dbMain") private repo: Repository<AccountEntity>) {}

  /**
   * Метод находит аккаунт по параметрам с пагинацией
   * @param {AccountsQueryParams} params
   * @returns AccountsPaginationData | null
   */
  async getWithPagination(params: AccountsQueryParams): Promise<AccountsPaginationData> {
    const query = this.repo.createQueryBuilder("accounts");
    if (params?.search?.length) {
      query.where("LOWER(accounts.email) LIKE LOWER(:search) OR LOWER(accounts.username) LIKE LOWER(:search)", {
        search: params.search,
      });
    }

    const { page, limit } = params;
    const offset = limit * page - limit;

    query.orderBy("accounts.createdAt", "DESC").skip(offset).take(limit);

    const [accounts, total] = await query.getManyAndCount();
    const count = accounts?.length;
    const pageCount = Math.ceil(total / limit);

    return { accounts, count, totalCount: total, page: +page, pageCount };
  }

  /**
   * Метод находит аккаунт по параметрам
   * @param {AccountFindQueryParams} params
   * @returns AccountEntity | null
   */
  async getOne(params: AccountFindQueryParams): Promise<AccountEntity | null> {
    return this.repo.findOne({
      where: params,
    });
  }

  /**
   * Метод создает новый аккаунт и возвращает ключи
   * @param {AuthRegCredential} data
   * @returns AccountLoginData
   */
  async create(data: AuthRegCredential): Promise<AccountEntity> {
    const { email, password, username } = data;

    const accountExist = await this.checkAccount(username, email);
    if (accountExist) throw new HttpException("account is exist", HttpStatus.CONFLICT);

    const hashedPassword = await bcrypt.hash(password, 10);
    const permissions = this.getDefaultPermissions();

    const account: AccountEntity = {
      username,
      email,
      password: hashedPassword,
      permissions,
      roleId: AccountRoleEnum.user,
      isBanned: false,
    };

    const inserted = await this.repo.insert(account);
    const accountId = inserted?.identifiers[0]?.id;
    account.id = accountId;

    return account;
  }

  async updateToken(accoundId: number, token: string) {
    return this.repo.update(accoundId, { refreshToken: token });
  }

  /**
   * Проверяет есть ли аккаунт с по данным
   * @param {string} username
   * @param {string} email
   * @returns boolean
   */
  private async checkAccount(username: string, email: string): Promise<boolean> {
    const account = await this.repo.findOne({
      where: [{ username }, { email }],
    });
    return !!account;
  }

  /**
   * Просто возвращает объект с дефотными пермишенами
   * @returns AccountPermissions
   */
  private getDefaultPermissions(): AccountPermissions {
    return {
      users: {
        edit: false,
        delete: false,
        banned: false,
        muted: false,
      },
      moviester: {
        movies: {
          apped: false,
          edit: false,
          delete: false,
        },
        comments: {
          edit: false,
          delete: false,
        },
      },
    };
  }
}
