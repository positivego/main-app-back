import { AccountEntity } from "../entities/account.entity";

export type AccountFindQueryParams = Partial<Omit<AccountEntity, "permissions">>;

export class AccountsQueryParams {
  search: string;
  page: number;
  limit: number;
}

export class AccountsPaginationData {
  accounts: AccountEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
