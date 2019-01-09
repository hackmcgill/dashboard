import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIRoute, CACHE_USER_KEY, IAccount, IInviteInfo } from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';
import APIResponse from './APIResponse';

class AccountAPI {
  constructor() {
    API.createEntity(APIRoute.ACCOUNT);
    API.createEntity(APIRoute.ACCOUNT_SELF);
    API.createEntity(APIRoute.ACCOUNT_INVITE);
  }
  /**
   * Create an account.
   * @param account The account that you want to create
   * @param authToken If there is an authentication token associated with the account creation, then provide it here.
   */
  public async create(
    account: IAccount,
    authToken?: string
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    let config: AxiosRequestConfig = {};
    if (authToken) {
      config = {
        headers: {
          Authentication: authToken,
        },
      };
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT).create(account, {
      config,
    });
    LocalCache.set(CACHE_USER_KEY, value);
    return value;
  }
  /**
   * Get the logged-in user's information.
   */
  public async getSelf(
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const cached: any = LocalCache.get(CACHE_USER_KEY);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<IAccount>>;
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT_SELF).getAll();
    LocalCache.set(CACHE_USER_KEY, value);
    return value;
  }
  /**
   * Get information about a user
   * @param id the ID of the account
   */
  public async get(
    id: string,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const key = CACHE_USER_KEY + '-' + id;
    const cached: any = LocalCache.get(key);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<IAccount>>;
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT).getOne({ id });
    LocalCache.set(key, value);
    return value;
  }
  /**
   * Update an account. In the future, we might want to relax the attributes being passed in
   * so that it's not the entirety of the Account object.
   * @param {IAccount} account
   */
  public async update(
    account: IAccount
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const value = await API.getEndpoint(APIRoute.ACCOUNT).patch(
      account,
      account
    );
    LocalCache.remove(CACHE_USER_KEY);
    return value;
  }

  /**
   * Invites a user to create an account with the specified accountType.
   * @param {{email: string, accountType: string}} info
   */
  public invite(info: IInviteInfo): AxiosPromise<APIResponse<{}>> {
    return API.getEndpoint(APIRoute.ACCOUNT_INVITE).create(info);
  }
}
export const Account = new AccountAPI();
export default Account;
