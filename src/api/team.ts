import { AxiosPromise } from 'axios';
import { APIRoute, CACHE_HACKER_KEY, ITeam } from '../config';
import { ITeamResponse } from '../config/teamGETResponse';
import LocalCache from '../util/LocalCache';
import API from './api';
import APIResponse from './APIResponse';

class TeamAPI {
  constructor() {
    API.createEntity(APIRoute.TEAM);
    API.createEntity(APIRoute.TEAM_JOIN);
    API.createEntity(APIRoute.TEAM_LEAVE);
  }
  /**
   * create a team.
   * @param team The team you want to create.
   */
  public create(team: ITeam): AxiosPromise<APIResponse<{}>> {
    LocalCache.remove(CACHE_HACKER_KEY);
    return API.getEndpoint(APIRoute.TEAM).create(team);
  }
  /**
   * Join an existing team
   * @param name the team name
   */
  public join(name: string): AxiosPromise<APIResponse<{}>> {
    return API.getEndpoint(APIRoute.TEAM_JOIN).patch({ id: '' }, { name });
  }
  /**
   * Get information about a team
   * @param id the ID of the hacker in a team
   */
  public get(id: string): AxiosPromise<APIResponse<ITeamResponse>> {
    return API.getEndpoint(APIRoute.TEAM).getOne({ id });
  }
  /**
   * Current hacker leaves their team
   */
  public leave(): AxiosPromise<APIResponse<{}>> {
    LocalCache.remove(CACHE_HACKER_KEY);
    return API.getEndpoint(APIRoute.TEAM_LEAVE).patch({ id: '' }, {});
  }
}

export const Team = new TeamAPI();
export default Team;
