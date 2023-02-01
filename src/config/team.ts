export interface ITeam {
  name: string;
  members: number[];
  devpostURL?: string;
  projectName?: string;
}

export interface IMemberName {
  firstName: string;
  lastName: string;
  school?: string;
  status: string;
}
