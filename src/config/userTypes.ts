import HackerStatus from './hackerStatus';
import JobInterest from './jobInterests';
export interface IAccount {
  accountType: UserType;
  confirmed: boolean;
  // The first name of the user
  firstName: string;
  // The last name of the user
  lastName: string;
  // The email of the user
  email: string;
  // The dietary restrictions for the user
  dietaryRestrictions: string[];
  // The shirt size
  shirtSize: string;
  // The password
  password: string;
  // The user's phone number
  phoneNumber: string;
  // The birthdate
  birthDate: string;
  // The preferred pronoun
  pronoun: string;
  // The database id (if new, leave blank / make '')
  id: string;
}

export interface IHacker {
  [key: string]: any;
  id: string;
  accountId: string;
  status: HackerStatus;
  school: string;
  degree: string;
  // no enum for these
  gender?: string;
  needsBus?: boolean;
  application: {
    portfolioURL: {
      // gcloud bucket link
      resume: string;
      github?: string;
      dropler?: string;
      personal?: string;
      linkedIn?: string;
      other?: string;
    };
    jobInterest: JobInterest;
    // array of mongoose ids referencing different skills
    skills?: string[];
    // any miscelaneous comments that the user has
    comments?: string;
    // "Why do you want to come to our hackathon?"
    essay?: string;
  };
  ethnicity: string[];
  major: string;
  graduationYear: number;
  codeOfConduct: boolean;
}

export interface ISponsor {
  // The Sponsor's account id.
  accountId: string;
  // What tier the sponsor is.
  tier: number;
  // The sponsor's company
  company: string;
  // The URL that of the contract that was signed with this sponsor
  contractURL: string;
  // The list of IDs of Hackers that this sponsor nominates.
  nominees: string[];
}

export enum UserType {
  UNKNOWN = 'Unknown',
  HACKER = 'Hacker',
  VOLUNTEER = 'Volunteer',
  STAFF = 'Staff',
  SPONSOR = 'Sponsor',
}
