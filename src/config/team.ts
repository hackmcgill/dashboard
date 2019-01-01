import { IHacker } from './userTypes';

export interface ITeam {
  teamName: string;
  members: string[] | IHacker[];
}
