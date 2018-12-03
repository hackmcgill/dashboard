import { ISponsor } from '../config/userTypes';
import { AxiosPromise } from 'axios';
import Route from '../config/APIRoute';
import API from './api';
class SponsorAPI {
    constructor() {
        API.createEntity(Route.SPONSOR);
    }
    /**
     * Create an account.
     * @param sponsor The sponsor that you want to create
     */
    public create(sponsor: ISponsor): AxiosPromise {
        return API.getEndpoint(Route.SPONSOR).create(sponsor);
    }
    /**
     * Get information about a sponsor
     * @param id the ID of the sponsor
     */
    public get(id: string): AxiosPromise {
        return API.getEndpoint(Route.SPONSOR).getOne({ id });
    }
}

export default new SponsorAPI();
