import { IAccount } from '../shared/userTypes';
import { AxiosPromise } from 'axios';
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
     */
    public create(account: IAccount): AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT).create(account);
    }
    /**
     * Get the logged-in user's information.
     */
    public getSelf(): AxiosPromise {
        return API.getEndpoint(CONSTANTS.ACCOUNT_SELF).getAll();
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
