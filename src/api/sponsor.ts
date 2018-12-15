import { AxiosPromise } from 'axios';
import { APIRoute, ISponsor } from '../config';
import API from './api';
class SponsorAPI {
  constructor() {
    API.createEntity(APIRoute.SPONSOR);
  }
  /**
   * Create an account.
   * @param sponsor The sponsor that you want to create
   */
  public create(sponsor: ISponsor): AxiosPromise {
    return API.getEndpoint(APIRoute.SPONSOR).create(sponsor);
  }
  /**
   * Get information about a sponsor
   * @param id the ID of the sponsor
   */
  public get(id: string): AxiosPromise {
    return API.getEndpoint(APIRoute.SPONSOR).getOne({ id });
  }
}
export const Sponsor = new SponsorAPI();
export default Sponsor;
