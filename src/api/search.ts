import { AxiosPromise, AxiosResponse } from 'axios';
import {
  APIRoute,
  CACHE_SEARCH_TABLE_KEY,
  ISearchOptions,
  ISearchParameter,
} from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';
import APIResponse from './APIResponse';
class SearchAPI {
  constructor() {
    API.createEntity(APIRoute.SEARCH);
  }
  public async search(
    model: string,
    parameters: ISearchParameter[],
    searchOptions: ISearchOptions,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<any[]>>> {
    const q = JSON.stringify(parameters);
    const key = `${CACHE_SEARCH_TABLE_KEY}-${model}-${q}`;
    const cached: any = LocalCache.get(key);
    if (cached && !overrideCache) {
      return cached as AxiosPromise<APIResponse<any[]>>;
    }
    const result: AxiosResponse<APIResponse<any[]>> = await API.getEndpoint(
      APIRoute.SEARCH
    ).getAll({
      params: {
        q,
        model,
        ...searchOptions,
      },
    });
    LocalCache.set(key, result, new Date(Date.now() + 5 * 60 * 1000));
    return result;
  }
}
export const Search = new SearchAPI();
export default Search;
