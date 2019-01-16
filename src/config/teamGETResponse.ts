import { IMemberName, ITeam } from './team';

export interface ITeamResponse {
  team: ITeam;
  members: IMemberName[];
}
