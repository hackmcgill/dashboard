import { IAccount } from '../shared/userTypes';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import * as CONSTANTS from '../shared/constants';
import API from './api';
class AccountAPI {
    constructor() {
        API.createEntity(CONSTANTS.ACCOUNT);
        API.createEntity(CONSTANTS.ACCOUNT_SELF);
    }
    /**
     * Create an account.
     * @param account The account that you want to create
     * @param authToken If there is an authentication token associated with the account creation, then provide it here.
     */
    public create(account: IAccount, authToken?: string): AxiosPromise {
        let config: AxiosRequestConfig = {};
        if (!!authToken) {
            config = {
                headers: {
                    Authentication: authToken
                }
            };
        }
        return API.getEndpoint(CONSTANTS.ACCOUNT).create(account, config);
    }
    /**
     * Get the logged-in user's information.
     */
    public getSelf(): AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT_SELF).getAll();
    }
    /**
     * Get information about a user
     * @param id the ID of the account
     */
    public get(id: string): AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT).getOne({ id });
    }
    /**
     * Update an account. In the future, we might want to relax the attributes being passed in
     * so that it's not the entirety of the Account object.
     * @param {IAccount} account 
     */
    public update(account: IAccount): AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT).patch(account, account);
    }
}

export default new AccountAPI();
