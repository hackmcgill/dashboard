import {IAccount} from '../shared/userTypes';
import {AxiosPromise, AxiosResponse} from 'axios';
import * as CONSTANTS from '../shared/constants';
import API from './api';
class AccountAPI {
    constructor() {
        API.createEntity(CONSTANTS.ACCOUNT);
        API.createEntity(CONSTANTS.ACCOUNT_SELF);
    }
    /**
     * 
     * @param account The account that you want to create
     */
    public create(account: IAccount):AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT).create(account);
    }
    /**
     * Get the current user's information
     */
    public getSelf() {
        return API.getEndpoint(CONSTANTS.ACCOUNT_SELF).getAll();
    }
    /**
     * 
     * @param {IAccount} account 
     */
    public update(account: IAccount): AxiosPromise<AxiosResponse> {
        return API.getEndpoint(CONSTANTS.ACCOUNT).patch(account, account);        
    }
}

export default new AccountAPI();