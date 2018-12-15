import { AxiosPromise } from 'axios';
import { APIRoute, ISearchParameter } from '../config';
import API from './api';
class SearchAPI {
  constructor() {
    API.createEntity(APIRoute.SEARCH);
  }
  public search(parameters: ISearchParameter[]): AxiosPromise {
    const escapedSearch: string = this.encodeParameters(parameters);
    return API.getEndpoint(APIRoute.SEARCH).getAll({
      params: {
        q: escapedSearch,
      },
    });
  }
  /**
   * Encode the search parameters.
   * @param parameters The parameters of the search
   */
  private encodeParameters(parameters: ISearchParameter[]): string {
    const stringifiedParams: string = JSON.stringify(parameters);
    return encodeURIComponent(stringifiedParams);
  }
}
export const Search = new SearchAPI();
export default Search;
