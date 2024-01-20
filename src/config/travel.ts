export interface ITravel {
  // The travel's id
  id: string;
  // The id of the user that is travelling
  accountId: string;
  // The id of the hacker that is travlling
  hackerId: string;
  // The status of the hacker
  status: string;
  // The amount of money the traveller is requesting
  request: number;
  // The amount of money we are offering the traveller
  offer: number;
}
