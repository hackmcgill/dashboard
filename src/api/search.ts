import { AxiosPromise } from 'axios';
import Route from '../config/APIRoute';
import API from './api';
import ISearchParameter from '../config/searchParameter';
class SearchAPI {
    constructor() {
        API.createEntity(Route.SEARCH);
    }
    public search(parameters: ISearchParameter[]): AxiosPromise {
        const escapedSearch: string = this.encodeParameters(parameters);
        return API.getEndpoint(Route.SEARCH).getAll({
            params: {
                'q': escapedSearch
            }
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

export default new SearchAPI();
