import { AxiosPromise } from 'axios';
import { APIRoute, ITeam } from '../config';
import API from './api';
import APIResponse from './APIResponse';

class TeamAPI {
  constructor() {
    API.createEntity(APIRoute.TEAM);
  }
  /**
   * create a team.
   * @param team The team you want to create.
   */
  public create(team: ITeam): AxiosPromise {
    return API.getEndpoint(APIRoute.TEAM).create(team);
  }
  /**
   * Get information about a team
   * @param id the ID of the team
   */
  public get(id: string): AxiosPromise<APIResponse<ITeam>> {
    return API.getEndpoint(APIRoute.TEAM).getOne({ id });
  }
}

export const Team = new TeamAPI();
export default Team;
