import { ISponsor } from '../shared/userTypes';
import { AxiosPromise } from 'axios';
import * as CONSTANTS from '../shared/constants';
import API from './api';
class SponsorAPI {
    constructor() {
        API.createEntity(CONSTANTS.SPONSOR);
    }
    /**
     * Create an account.
     * @param sponsor The sponsor that you want to create
     */
    public create(sponsor: ISponsor): AxiosPromise {
        return API.getEndpoint(CONSTANTS.SPONSOR).create(sponsor);
    }
    /**
     * Get information about a sponsor
     * @param id the ID of the sponsor
     */
    public get(id: string): AxiosPromise {
        return API.getEndpoint(CONSTANTS.SPONSOR).getOne({ id });
    }
}

export default new SponsorAPI();
