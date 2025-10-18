import { AxiosPromise, AxiosResponse } from 'axios';
import API from './api';
import APIResponse from './APIResponse';

class EmailsAPI {
  constructor() {
    // register /api/email endpoints
    API.createEntity('email');
  }

  /**
   * Trigger automated status emails endpoint
   * POST /api/email/automated/status/:status
   */
  public sendAutomatedStatus(
    status: string
  ): AxiosPromise<APIResponse<{ success: number; failed: number }>
  > {
    // Use create with subURL to hit /email/automated/status/:status
    return API.getEndpoint('email').create(undefined, {
      subURL: `automated/status/${status}`,
    });
  }
}

export const Emails = new EmailsAPI();
export default Emails;
