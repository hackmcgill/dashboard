import { AxiosPromise } from 'axios';
import * as CONSTANTS from '../shared/constants';
import API from './api';
import ISearchParameter from 'src/shared/searchParameter';
class SearchAPI {
    constructor() {
        API.createEntity(CONSTANTS.SEARCH);
    }
    public search(parameters: ISearchParameter[]): AxiosPromise {
        const escapedSearch: string = this.encodeParameters(parameters);
        return API.getEndpoint(CONSTANTS.SEARCH).getAll({
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
