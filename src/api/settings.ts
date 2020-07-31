import { AxiosPromise } from 'axios';
import { APIResponse } from '.';
import { APIRoute, ISetting } from '../config';
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
    return API.getEndpoint(APIRoute.SETTINGS).create(setting);
  }
  /**
   * Get the current settings
   */
  public get(): AxiosPromise<APIResponse<ISetting>> {
    return API.getEndpoint(APIRoute.SETTINGS).getAll();
  }
}

export const Settings = new SettingsAPI();
export default Settings;
