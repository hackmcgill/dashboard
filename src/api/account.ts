import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIRoute, CACHE_USER_KEY, IAccount, IInviteInfo } from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';
import APIResponse from './APIResponse';

export type AccountUpdate = Partial<IAccount> & { identifier: number }

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
          token: authToken,
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
   * @param identifier the ID of the account
   */
  public async get(
    identifier: number,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const key = CACHE_USER_KEY + '-' + identifier;
    const cached: any = LocalCache.get(key);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<IAccount>>;
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT).getOne({
      identifier,
    });
    LocalCache.set(key, value);
    return value;
  }
  /**
   * Update an account. All fields are option with the exception of the identifier.
   * @param {AccountUpdate} account
   */
  public async update(
    account: AccountUpdate
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

  /**
   * Get all of the invites to the platform.
   */
  public getInvites(): AxiosPromise<APIResponse<IInviteInfo[]>> {
    return API.getEndpoint(APIRoute.ACCOUNT_INVITE).getAll();
  }
}
export const Account = new AccountAPI();
export default Account;
