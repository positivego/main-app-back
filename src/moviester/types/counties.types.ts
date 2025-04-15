import { MoviesterCountryEntity } from "../entities/country.entity";

export class CountriesQueryParams {
  page: number;
  limit: number;
}

export class CointriesPaginationData {
  countries: MoviesterCountryEntity[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
