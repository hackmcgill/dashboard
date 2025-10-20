import { AxiosPromise } from 'axios';
import API from './api';
import APIResponse from './APIResponse';
import axios from 'axios';

class EmailsAPI {
  constructor() {
    API.createEntity('email');
  }

  /**
   * Trigger automated status emails endpoint
   * POST /api/email/automated/status/:status
   */
  public sendAutomatedStatus(
    status: string
  ): AxiosPromise<APIResponse<{ success: number; failed: number }>> {
    return API.getEndpoint('email').create(undefined, {
      subURL: `automated/status/${status}`,
      config: { withCredentials: true },
    });
  }

  /**
   * Get count of hackers with specified status
   * GET /api/email/automated/status/:status/count
   */
  public getStatusCount(
    status: string
  ): AxiosPromise<APIResponse<{ count: number }>> {
    const baseURL = API.getEndpoint('email')['resourceURL'];
    return axios.get(`${baseURL}/automated/status/${status}/count`, {
      withCredentials: true,
    });
  }
}

export const Emails = new EmailsAPI();
export default Emails;
