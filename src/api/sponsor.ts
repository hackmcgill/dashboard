import { AxiosPromise, AxiosResponse } from 'axios';
import { APIResponse } from '.';
import { APIRoute, CACHE_SPONSOR_KEY, ISponsor } from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';

class SponsorAPI {
  constructor() {
    API.createEntity(APIRoute.SPONSOR);
    API.createEntity(APIRoute.SPONSOR_SELF);
  }
  /**
   * Create an account.
   * @param sponsor The sponsor that you want to create
   */
  public create(sponsor: ISponsor): AxiosPromise {
    return API.getEndpoint(APIRoute.SPONSOR).create(sponsor);
  }
  /**
   * Get the logged-in user's sponsor information, if they have a sponsor info.
   */
  public async getSelf(
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<ISponsor>>> {
    const cached: any = LocalCache.get(CACHE_SPONSOR_KEY);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<ISponsor>>;
    }
    const value = await API.getEndpoint(APIRoute.SPONSOR_SELF).getAll();
    LocalCache.set(CACHE_SPONSOR_KEY, value);
    return value;
  }
  /**
   * Get information about a sponsor
   * @param id the ID of the sponsor
   */
  public get(identifier: number): AxiosPromise {
    return API.getEndpoint(APIRoute.SPONSOR).getOne({ identifier });
  }

  /**
   * Update sponsor information
   * @param sponsor The sponsor object with an id
   */
  public update(sponsor: ISponsor): AxiosPromise {
    const key = CACHE_SPONSOR_KEY + '-' + sponsor.identifier;
    const value = API.getEndpoint(APIRoute.SPONSOR).patch(sponsor, sponsor);
    LocalCache.remove(CACHE_SPONSOR_KEY);
    LocalCache.remove(key);
    return value;
  }
}
export const Sponsor = new SponsorAPI();
export default Sponsor;
