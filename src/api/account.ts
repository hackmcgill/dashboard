import { IAccount } from '../config/userTypes';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import Route from '../config/APIRoute';
import API from './api';
import APIResponse from './APIResponse';
class AccountAPI {
    constructor() {
        API.createEntity(Route.ACCOUNT);
        API.createEntity(Route.ACCOUNT_SELF);
    }
    /**
     * Create an account.
     * @param account The account that you want to create
     * @param authToken If there is an authentication token associated with the account creation, then provide it here.
     */
    public create(account: IAccount, authToken?: string): AxiosPromise<APIResponse<IAccount>> {
        let config: AxiosRequestConfig = {};
        if (authToken) {
            config = {
                headers: {
                    Authentication: authToken
                }
            };
        }
        return API.getEndpoint(Route.ACCOUNT).create(account, { config });
    }
    /**
     * Get the logged-in user's information.
     */
    public getSelf(): AxiosPromise<APIResponse<IAccount>> {
        return API.getEndpoint(Route.ACCOUNT_SELF).getAll();
    }
    /**
     * Get information about a user
     * @param id the ID of the account
     */
    public get(id: string): AxiosPromise<APIResponse<IAccount>> {
        return API.getEndpoint(Route.ACCOUNT).getOne({ id });
    }
    /**
     * Update an account. In the future, we might want to relax the attributes being passed in
     * so that it's not the entirety of the Account object.
     * @param {IAccount} account 
     */
    public update(account: IAccount): AxiosPromise<APIResponse<IAccount>> {
        return API.getEndpoint(Route.ACCOUNT).patch(account, account);
    }
}

export default new AccountAPI();
