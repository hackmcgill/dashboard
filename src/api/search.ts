import { AxiosPromise } from 'axios';
import { APIRoute, ISearchOptions, ISearchParameter } from '../config';
import API from './api';
import APIResponse from './APIResponse';
class SearchAPI {
  constructor() {
    API.createEntity(APIRoute.SEARCH);
  }
  public search(
    model: string,
    parameters: ISearchParameter[],
    searchOptions: ISearchOptions
  ): AxiosPromise<APIResponse<any[]>> {
    return API.getEndpoint(APIRoute.SEARCH).getAll({
      params: {
        q: JSON.stringify(parameters),
        model,
        ...searchOptions,
      },
    });
  }
}
export const Search = new SearchAPI();
export default Search;
