import { IHacker } from '.';
import { IMemberName, ITeam } from './team';

export interface ITeamResponse {
  team: Omit<ITeam, 'members'>;
  members: IMemberName[];
}
