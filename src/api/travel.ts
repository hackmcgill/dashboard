import { AxiosResponse } from 'axios';
import {
  APIRoute,
  CACHE_TRAVEL_KEY,
  ITravel
} from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';
import APIResponse from './APIResponse';

class TravelAPI {
  constructor() {
    API.createEntity(APIRoute.TRAVEL_SELF);
    API.createEntity(APIRoute.TRAVEL_EMAIL);
    API.createEntity(APIRoute.TRAVEL);
  }
  /**
   * Get the logged-in user's travel information, if they have a travel info.
   */
  public async getSelf(
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<ITravel>>> {
    const cached: any = LocalCache.get(CACHE_TRAVEL_KEY);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<ITravel>>;
    }
    const value = await API.getEndpoint(APIRoute.TRAVEL_SELF).getAll();
    LocalCache.set(CACHE_TRAVEL_KEY, value);
    return value;
  }
  /**
   * Get information about a travel
   * @param id the ID of the travel
   */
  public async get(
    id: string,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<ITravel>>> {
    const key = CACHE_TRAVEL_KEY + '-' + id;
    const cached: any = LocalCache.get(key);
    if (cached && !overrideCache) {
      return cached as Promise<AxiosResponse<APIResponse<ITravel>>>;
    }
    const value = await API.getEndpoint(APIRoute.TRAVEL).getOne({ id });
    LocalCache.set(key, value);
    return value;
  }

  /**
   * Get information about a travel
   * @param id the ID of the travel
   */
  public async getByEmail(
    email: string,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<ITravel>>> {
    const value = await API.getEndpoint(APIRoute.TRAVEL_EMAIL).getOne({
      id: email,
    });
    return value;
  }
}

export const Travel = new TravelAPI();

export default Travel;
