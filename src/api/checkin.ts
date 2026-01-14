import { AxiosPromise } from 'axios';
import { APIRoute } from '../config';
import API from './api';
import APIResponse from './APIResponse';

interface ICheckinData {
  prizeCategories?: string[];
  sponsorChallenges?: string[];
  mlhChallenges?: string[];
  // workshopsAttended: string[];
  discordTag: string;
  devpostLink: string;
}

class CheckinAPI {
  constructor() {
    API.createEntity(APIRoute.HACKER_CHECKIN);
  }

  /**
   * Submits a hacker's check-in information
   * @param data The check-in data including team members, categories, and sponsor prizes
   */
  public submitCheckin(data: ICheckinData): AxiosPromise<APIResponse<{}>> {
    return API.getEndpoint(APIRoute.HACKER_CHECKIN).create({ formData: data });
  }
}

const checkinAPI = new CheckinAPI();

export const submitCheckin = async (formData: ICheckinData) => {
  return checkinAPI.submitCheckin(formData);
}; 
