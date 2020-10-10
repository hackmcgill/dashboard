import { AxiosPromise, AxiosResponse } from 'axios';
import { APIResponse } from '.';
import { APIRoute, CACHE_SETTINGS_KEY, ISetting } from '../config';
import LocalCache from '../util/LocalCache';
import API from './api';

class SettingsAPI {
  constructor() {
    API.createEntity(APIRoute.SETTINGS);
  }
  /**
   * Update the settings.
   * @param setting The settings that you want to update
   */
  public update(setting: ISetting): AxiosPromise {
    return API.getEndpoint(APIRoute.SETTINGS).patch({ id: '' }, setting);
  }
  /**
   * Get the current settings
   */
  public async get(
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<ISetting>>> {
    const cached: any = LocalCache.get(CACHE_SETTINGS_KEY);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<ISetting>>;
    }
    const value = await API.getEndpoint(APIRoute.SETTINGS).getAll();
    LocalCache.set(CACHE_SETTINGS_KEY, value);
    return value;
  }
}

export const Settings = new SettingsAPI();
export default Settings;
